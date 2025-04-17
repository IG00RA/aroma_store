import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(1, { message: "Введите имя пользователя" }),
  password: z.string().min(1, { message: "Введите пароль" }),
});

type AdminLoginProps = {
  onLogin: () => void;
};

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // For demo purposes, hardcoded credentials
    // In a real application, use a more secure authentication method
    if (values.username === "admin" && values.password === "admin123") {
      toast({
        title: "Вход выполнен успешно",
        description: "Добро пожаловать в панель администратора",
      });
      onLogin();
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверное имя пользователя или пароль",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-16 h-16 bg-product-beige/30 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-product" />
          </div>
          <CardTitle className="text-2xl">Вход в админ-панель</CardTitle>
          <CardDescription>
            Введите свои учетные данные для доступа к панели администратора
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя пользователя</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </Form>
        </CardContent>
        {/* <CardFooter className="text-center text-sm text-muted-foreground">
          <p className="w-full">Для демо-версии: имя пользователя <strong>admin</strong>, пароль <strong>admin123</strong></p>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default AdminLogin;
