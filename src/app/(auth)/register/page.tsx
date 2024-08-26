"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useRegisterForm from '@/hooks/forms/useRegisterForm'
import { RegisterFormData } from '@/lib/types/schemas/register-form';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';

const RegisterPage = () => {
  const form: UseFormReturn<RegisterFormData, any, undefined> = useRegisterForm();

  const submitHandler = (data: RegisterFormData) => {
    console.log(data);
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col space-y-8">
              <FormField 
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Email" 
                        {...field}
                        autoComplete="email"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              <FormField 
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Password"
                        {...field}
                        autoComplete="new-password"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              <FormField 
                control={form.control}
                name="confirmPassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Password" 
                        {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              <Button type="submit">Register</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage