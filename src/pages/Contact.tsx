import React, { useState } from 'react';
import { Send, Upload } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, isVisible] = useIntersectionObserver();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Form Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-16">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-400">
            Let's discuss how we can bring your vision to life
          </p>
        </div>

        <div className={`
          bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        `}>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white 
                    placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    transition-all duration-300 group-hover:border-gray-500"
                  placeholder="John Doe"
                />
              </div>
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white 
                    placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    transition-all duration-300 group-hover:border-gray-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white 
                  placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  transition-all duration-300 group-hover:border-gray-500"
                placeholder="Your Company"
              />
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white 
                  placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  transition-all duration-300 group-hover:border-gray-500"
                placeholder="Tell us about your project..."
              />
            </div>

            <div className="group">
              <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
                Attach Files (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 
                border-dashed rounded-lg transition-all duration-300 hover:border-gray-500 
                group-hover:border-gray-500">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 animate-float" />
                  <div className="flex text-sm text-gray-400">
                    <label htmlFor="file" className="relative cursor-pointer rounded-md font-medium 
                      text-blue-400 hover:text-blue-300 transition-colors">
                      <span>Upload a file</span>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    PDF, DOC, Images up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 
                  text-white px-8 py-3 rounded-full font-medium transition-all duration-300 
                  hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 btn-interaction"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className={`h-5 w-5 ${isSubmitting ? 'animate-pulse' : 'animate-float'}`} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;