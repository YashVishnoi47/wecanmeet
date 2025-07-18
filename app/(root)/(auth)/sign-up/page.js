"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "@/lib/validator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import UseUserStore from "@/store/userStore";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const { loading, setLoading, errormsg, setErrormsg } = UseUserStore();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      userName: "",
      Email: "",
      FullName: "",
      password: "",
    },
  });

  const handleSignIn = async ({ email, password }) => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res.ok) {
      console.log("Login failed:", res.error);
    }
    if (res.ok) {
      router.push("/");
    } else {
      console.log("Error");
    }
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FullName: values.FullName,
          userName: values.userName,
          Email: values.Email,
          password: values.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        handleSignIn({ email: values.Email, password: values.password });
        router.push("/");
      } else {
        setLoading(false);
        setErrormsg(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 w-full h-screen flex flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-xl shadow-md w-full flex flex-col justify-center mt-10 max-w-md mx-auto"
        >
          {errormsg && <p className="text-xl text-red-500">{errormsg}</p>}
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500" />
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  E-mail
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="E-mail"
                    {...field}
                    className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500" />
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="FullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Fullname
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fullname"
                    {...field}
                    className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500" />
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type={"password"}
                    {...field}
                    className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500" />
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            {loading ? "Loading" : "SignUp"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
