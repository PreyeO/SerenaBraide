"use client";

import { useMutation } from "@tanstack/react-query";
import emailjs from "@emailjs/browser";

import { notify } from "@/lib/notify";
import { ContactFormValues } from "@/types/general";

export function useContact() {
  return useMutation({
    mutationFn: async (values: ContactFormValues) => {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing");
      }

      const currentYear = new Date().getFullYear();

      const templateParams = {
        from_name: values.fullName,
        from_email: values.email,
        phone_number: values.phoneNumber,
        subject: values.Subject,
        country: values.country,
        message: values.message,
        current_year: currentYear.toString(),
      };

      // Send both emails: one to the admin, one auto-reply to the user
      const sendEmail = emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      const sendAutoReply = autoReplyTemplateId 
        ? emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey)
        : Promise.resolve();

      return Promise.all([sendEmail, sendAutoReply]);
    },
    onSuccess: () => {
      notify.success("Message received! We will get back to you shortly.");
    },
    onError: (error: any) => {
      console.error("EmailJS Error:", error);
      notify.error(error.message || "Failed to send message");
    },
  });
}
