
import React, { useState, useEffect } from 'react';
import EditorTemplate from './EditorTemplate';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Star, Upload, Image, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  image?: string;
};

const ReviewsEditor = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [newReview, setNewReview] = useState<Omit<Review, 'id'>>({
    name: '',
    rating: 5,
    text: '',
    image: ''
  });

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        console.error('Failed to parse reviews', e);
      }
    } else {
      // Set default reviews if none exist
      const defaultReviews = [
        {
          id: '1',
          name: "Анна",
          rating: 5,
          text: "Прекрасный держатель! Выглядит намного дороже своей цены. Очень стильный и отлично выполняет свою функцию.",
          image: "/placeholder.svg"
        },
        {
          id: '2',
          name: "Михаил",
          rating: 5,
          text: "Наконец-то нашел идеальный держатель для благовоний. Минималистичный дизайн, устойчивость и функциональность - все, что мне нужно.",
          image: "/placeholder.svg"
        },
        {
          id: '3',
          name: "Екатерина",
          rating: 4,
          text: "Отличное качество изготовления, пепел не разлетается, что очень важно. Рекомендую!",
          image: "/placeholder.svg"
        }
      ];
      setReviews(defaultReviews);
      localStorage.setItem('reviews', JSON.stringify(defaultReviews));
    }
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem('reviews', JSON.stringify(reviews));
      toast({
        title: "Сохранено!",
        description: "Отзывы успешно обновлены",
      });
    } catch (e) {
      console.error('Failed to save reviews', e);
      toast({
        title: "Ошибка!",
        description: "Не удалось сохранить отзывы",
        variant: "destructive"
      });
    }
  };

  const handleAddReview = () => {
    const id = Date.now().toString();
    const updatedReviews = [...reviews, { id, ...newReview }];
    setReviews(updatedReviews);
    setIsAddDialogOpen(false);
    setNewReview({
      name: '',
      rating: 5,
      text: '',
      image: ''
    });
    
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    toast({
      title: "Успешно!",
      description: "Новый отзыв добавлен",
    });
  };

  const handleEditReview = () => {
    if (!currentReview) return;
    
    const updatedReviews = reviews.map(review => 
      review.id === currentReview.id ? currentReview : review
    );
    
    setReviews(updatedReviews);
    setIsEditDialogOpen(false);
    setCurrentReview(null);
    
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    toast({
      title: "Успешно!",
      description: "Отзыв обновлен",
    });
  };

  const handleDeleteReview = (id: string) => {
    const updatedReviews = reviews.filter(review => review.id !== id);
    setReviews(updatedReviews);
    
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    toast({
      title: "Удалено!",
      description: "Отзыв успешно удален",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload this to a server
    // For this example, we'll use a data URL
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      if (isEdit && currentReview) {
        setCurrentReview({ ...currentReview, image: imageUrl });
      } else {
        setNewReview({ ...newReview, image: imageUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <EditorTemplate
      title="Редактор отзывов"
      description="Управление отзывами клиентов, которые отображаются на сайте."
      onSave={handleSave}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Список отзывов</h3>
          <Button 
            onClick={() => setIsAddDialogOpen(true)} 
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Добавить отзыв
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Фото</TableHead>
              <TableHead>Имя</TableHead>
              <TableHead>Рейтинг</TableHead>
              <TableHead>Текст</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <Avatar>
                    {review.image ? (
                      <AvatarImage src={review.image} alt={review.name} />
                    ) : (
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                </TableCell>
                <TableCell>{review.name}</TableCell>
                <TableCell>
                  <div className="flex">{renderStars(review.rating)}</div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{review.text}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setCurrentReview(review);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Review Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить новый отзыв</DialogTitle>
            <DialogDescription>
              Заполните данные для создания нового отзыва клиента
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Имя клиента</Label>
              <Input 
                id="name" 
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rating">Рейтинг (1-5)</Label>
              <Input 
                id="rating" 
                type="number" 
                min="1" 
                max="5" 
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="text">Текст отзыва</Label>
              <Textarea 
                id="text" 
                rows={3}
                value={newReview.text}
                onChange={(e) => setNewReview({...newReview, text: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label>Фото клиента</Label>
              <div className="flex items-center gap-4">
                {newReview.image ? (
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={newReview.image} alt="Preview" />
                    <AvatarFallback>ФО</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Image className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <div className="flex-1">
                  <Label htmlFor="image" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-2 border border-dashed rounded-md hover:bg-gray-50">
                      <Upload className="h-4 w-4" />
                      <span>Загрузить фото</span>
                    </div>
                    <Input 
                      id="image" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => uploadImage(e, false)}
                    />
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleAddReview}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Review Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать отзыв</DialogTitle>
            <DialogDescription>
              Внесите необходимые изменения в данные отзыва
            </DialogDescription>
          </DialogHeader>
          {currentReview && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Имя клиента</Label>
                <Input 
                  id="edit-name" 
                  value={currentReview.name}
                  onChange={(e) => setCurrentReview({...currentReview, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-rating">Рейтинг (1-5)</Label>
                <Input 
                  id="edit-rating" 
                  type="number" 
                  min="1" 
                  max="5" 
                  value={currentReview.rating}
                  onChange={(e) => setCurrentReview({...currentReview, rating: parseInt(e.target.value)})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-text">Текст отзыва</Label>
                <Textarea 
                  id="edit-text" 
                  rows={3}
                  value={currentReview.text}
                  onChange={(e) => setCurrentReview({...currentReview, text: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label>Фото клиента</Label>
                <div className="flex items-center gap-4">
                  {currentReview.image ? (
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={currentReview.image} alt="Preview" />
                      <AvatarFallback>{currentReview.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Image className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Label htmlFor="edit-image" className="cursor-pointer">
                      <div className="flex items-center gap-2 p-2 border border-dashed rounded-md hover:bg-gray-50">
                        <Upload className="h-4 w-4" />
                        <span>Загрузить фото</span>
                      </div>
                      <Input 
                        id="edit-image" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => uploadImage(e, true)}
                      />
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleEditReview}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </EditorTemplate>
  );
};

export default ReviewsEditor;
