"use client";
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhoneCall, FiMail, FiMapPin, FiGlobe, FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';
import { div } from 'framer-motion/client';
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

interface ContactViewProps {
  data?: any;
}

const ContactUs: React.FC<ContactViewProps> = ({ data }) => {
  const t = useTranslations('Navigation');
  const tContact = useTranslations('ContactPage');

  const phone = data?.phone || "+886-2-1234-5678";
  const email = data?.email || "info@itbca.org";
  const address = data?.address || "9F, No. 223, Zhonghua 1st Rd., Gushan Dist., Kaohsiung City 804, Taiwan";

  const getHeaderImages = (): string[] => {
    const bgData = data?.headerImage;
    if (!bgData) return [];

    if (bgData.data) {
      const items = Array.isArray(bgData.data) ? bgData.data : [bgData.data];
      return items.map((item: any) => {
        const url = item?.attributes?.url || item?.url;
        if (!url) return '';
        return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${url}`;
      }).filter(Boolean);
    }

    const items = Array.isArray(bgData) ? bgData : [bgData];
    return items.map((item: any) => {
      const url = item?.url;
      if (!url) return '';
      return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${url}`;
    }).filter(Boolean);
  };

  const headerImages = getHeaderImages();

  return (
    <div className="bg-gray-50">
      <PageHeader 
        title={t('contact')} 
        bgImage={headerImages.length > 0 ? headerImages : undefined}
        breadcrumbs={[{ name: t('home'), path: '/' }, { name: t('contact') }]} 
      />
      
      {/* Main Contact Section */}
      <section className="py-20 lg:py-28 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Primary Contact Details */}
            <motion.div 
              className="lg:w-1/3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeInUp} className="text-seppa-red font-medium uppercase tracking-wider mb-2 text-xs md:text-sm">
                {tContact('headquarters')}
              </motion.h3>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-seppa-blue leading-tight md:leading-[1.1] mb-6 md:mb-8">
                {tContact('getInTouch')}
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-500 text-sm md:text-base mb-8 leading-relaxed">
                {tContact('description')}
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-6">
                <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-6 p-6 bg-white rounded-2xl hover:shadow-md transition group border border-gray-100">
                  <div className="w-16 h-16 bg-seppa-blue/5 text-seppa-red rounded-full flex items-center justify-center text-2xl shrink-0 group-hover:bg-seppa-red group-hover:text-white transition shadow-sm">
                    <FiPhoneCall />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold font-heading text-seppa-blue mb-1">{tContact('tollFree')}</h3>
                    <p className="text-gray-500 text-sm md:text-base">{phone}</p>
                  </div>
                </a>

                <a href={`mailto:${email}`} className="flex items-center gap-6 p-6 bg-white rounded-2xl hover:shadow-md transition group border border-gray-100">
                  <div className="w-16 h-16 bg-seppa-blue/5 text-seppa-red rounded-full flex items-center justify-center text-2xl shrink-0 group-hover:bg-seppa-red group-hover:text-white transition shadow-sm">
                    <FiMail />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold font-heading text-seppa-blue mb-1">{tContact('quickEmail')}</h3>
                    <p className="text-gray-500 text-sm md:text-base">{email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-6 p-6 bg-white rounded-2xl hover:shadow-md transition group border border-gray-100">
                  <div className="w-16 h-16 bg-seppa-blue/5 text-seppa-red rounded-full flex items-center justify-center text-2xl shrink-0 group-hover:bg-seppa-red group-hover:text-white transition shadow-sm">
                    <FiMapPin />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold font-heading text-seppa-blue mb-1">{tContact('corporateOffice')}</h3>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed whitespace-pre-line">{address}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="lg:w-2/3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-seppa-blue p-8 lg:p-14 rounded-3xl h-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-seppa-red rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold font-heading text-white mb-6 md:mb-8">{tContact('sendMessage')}</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <input 
                          type="text" 
                          placeholder={tContact('yourName')}
                          required
                          className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-seppa-red transition backdrop-blur-sm" 
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          placeholder={tContact('emailAddress')}
                          required
                          className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-seppa-red transition backdrop-blur-sm" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <input 
                          type="tel" 
                          placeholder={tContact('phoneNumber')}
                          required
                          className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-seppa-red transition backdrop-blur-sm" 
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          placeholder={tContact('location')}
                          required
                          className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-seppa-red transition backdrop-blur-sm" 
                        />
                      </div>
                    </div>
                    <div>
                      <textarea 
                        rows={5} 
                        required
                        placeholder={tContact('writeMessage')}
                        className="w-full px-6 py-4 rounded-3xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-seppa-red transition resize-none backdrop-blur-sm"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="bg-seppa-red text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-seppa-red transition duration-300 w-full md:w-auto shadow-lg"
                    >
                      {tContact('submitMessage')}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
