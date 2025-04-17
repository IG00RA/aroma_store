
import React, { ReactNode } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type EditorTemplateProps = {
  title: string;
  description: string;
  children: ReactNode;
  onSave?: () => void;
};

const EditorTemplate = ({ 
  title, 
  description, 
  children, 
  onSave 
}: EditorTemplateProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      // Default save behavior
      toast({
        title: "Сохранено!",
        description: `Изменения в разделе "${title}" сохранены`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="ml-auto">
          <Save className="mr-2 h-4 w-4" />
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditorTemplate;
