import React, { useState, useEffect } from 'react';
import EditorTemplate from './EditorTemplate';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Phone, Mail, FileText, MessageCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { FooterConfig } from '@/components/Footer';

const ContactsEditor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('contacts');

  const form = useForm<FooterConfig>({
    defaultValues: {
      showSocials: true,
      socials: {
        instagram: '',
        tiktok: ''
      },
      contacts: {
        email: '',
        phone: ''
      },
      policies: {
        privacy: '',
        terms: '',
        shipping: ''
      },
      messengers: {
        telegram: '',
        viber: '',
        whatsapp: ''
      }
    }
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem('footerConfig');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        form.reset(config);
      } catch (error) {
        console.error('Failed to parse footer config', error);
      }
    }
  }, [form]);

  const handleSave = (data: FooterConfig) => {
    try {
      localStorage.setItem('footerConfig', JSON.stringify(data));
      toast({
        title: 'Сохранено!',
        description: 'Настройки контактов и футера обновлены',
      });
    } catch (error) {
      console.error('Failed to save footer config', error);
      toast({
        title: 'Ошибка!',
        description: 'Не удалось сохранить настройки',
        variant: 'destructive',
      });
    }
  };

  return (
    <EditorTemplate
      title="Настройки контактов и футера"
      description="Управление контактной информацией, ссылками на соц сети и другими элементами подвала сайта."
      onSave={form.handleSubmit(handleSave)}
    >
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="contacts">Контакты</TabsTrigger>
          <TabsTrigger value="socials">Соц сети</TabsTrigger>
          <TabsTrigger value="messengers">Мессенджеры</TabsTrigger>
          <TabsTrigger value="policies">Документы</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <TabsContent value="contacts">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="contacts.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-l-md border border-r-0 border-input">
                        <Mail className="h-4 w-4" />
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="info@example.com" 
                          className="rounded-l-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contacts.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-l-md border border-r-0 border-input">
                        <Phone className="h-4 w-4" />
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="+380 (XXX) XXX-XX-XX" 
                          className="rounded-l-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="socials">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="showSocials"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mb-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Показывать соц сети</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Включить или отключить отображение блока соц сетей в футере
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socials.instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-l-md border border-r-0 border-input">
                        <Instagram className="h-4 w-4" />
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="https://instagram.com/youraccount" 
                          className="rounded-l-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socials.tiktok"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TikTok</FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-l-md border border-r-0 border-input">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12a4 4 0 1 0 4 4V4c5 0 5 8 9 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="https://tiktok.com/@youraccount" 
                          className="rounded-l-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="messengers">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="messengers.telegram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram</FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-l-md border border-r-0 border-input">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="https://t.me/yourusername" 
                          className="rounded-l-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="messengers.viber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Viber</FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-l-md border border-r-0 border-input">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="viber://chat?number=+380XXXXXXXXX" 
                          className="rounded-l-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="messengers.whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-l-md border border-r-0 border-input">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="https://wa.me/380XXXXXXXXX" 
                          className="rounded-l-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="policies">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="policies.privacy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Политика конфиденциальности</FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-l-md border border-r-0 border-input">
                        <FileText className="h-4 w-4" />
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="URL политики конфиденциальности" 
                          className="rounded-l-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="policies.terms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Условия использования</FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-l-md border border-r-0 border-input">
                        <FileText className="h-4 w-4" />
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="URL условий использования" 
                          className="rounded-l-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="policies.shipping"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Доставка и оплата</FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-l-md border border-r-0 border-input">
                        <FileText className="h-4 w-4" />
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="URL информации о доставке и оплате" 
                          className="rounded-l-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Form>
      </Tabs>
    </EditorTemplate>
  );
};

export default ContactsEditor;
