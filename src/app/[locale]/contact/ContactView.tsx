"use client";
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FiPhoneCall, FiMail, FiMapPin } from 'react-icons/fi';

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

  // Taiwan Headquarters (from CMS or fallback defaults)
  const phone = data?.phone || "+886-2-1234-5678";
  const email = data?.email || "info@itbca.org";
  const address = data?.address || "9F, No. 223, Zhonghua 1st Rd., Gushan Dist., Kaohsiung City 804, Taiwan";

  // India Office (from CMS or fallback defaults)
  const indiaPhone = data?.indiaPhone || "9789895999";
  const indiaEmail = data?.indiaEmail || "rajesh@zilei.com.tw";
  const indiaAddress = data?.indiaAddress || "57,58,59,60 thirumalai street, Balakrishna nagar, ramapuram, Chennai 89";

  // Format absolute or relative Strapi Media URLs
  const formatImageUrl = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/uploads/')) {
      return url;
    }
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://13.234.18.254:1337';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `${cleanBase}${cleanPath}`;
  };

  const getHeaderImages = (): string[] => {
    const bgData = data?.headerImage;
    if (!bgData) return ["/uploads/banner_1_1099ae5a57.jpg"];

    let images: string[] = [];
    if (bgData.data) {
      const items = Array.isArray(bgData.data) ? bgData.data : [bgData.data];
      images = items.map((item: any) => {
        const url = item?.attributes?.url || item?.url;
        return url ? formatImageUrl(url) : '';
      }).filter(Boolean);
    } else {
      const items = Array.isArray(bgData) ? bgData : [bgData];
      images = items.map((item: any) => {
        const url = item?.url;
        return url ? formatImageUrl(url) : '';
      }).filter(Boolean);
    }
    
    return images.length > 0 ? images : ["/uploads/banner_1_1099ae5a57.jpg"];
  };

  const headerImages = getHeaderImages();

  return (
    <div className="bg-gray-50">
      <PageHeader 
        title={t('contact')} 
        bgImage={headerImages}
        breadcrumbs={[{ name: t('home'), path: '/' }, { name: t('contact') }]} 
      />
      
      {/* Main Contact Section */}
      <section className="py-20 lg:py-28 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* Contact Details (Left Column) */}
            <motion.div 
              className="w-full lg:w-5/12 space-y-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <div>
                <motion.h3 variants={fadeInUp} className="text-seppa-red font-medium uppercase tracking-wider mb-2 text-xs md:text-sm">
                  {tContact('headquarters')}
                </motion.h3>
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-seppa-blue leading-tight mb-4">
                  {tContact('getInTouch')}
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-gray-500 text-sm md:text-base leading-relaxed">
                  {tContact('description')}
                </motion.p>
              </div>

              {/* Taiwan Office details */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="text-xl font-bold font-heading text-seppa-blue border-b border-gray-200 pb-2">
                  {tContact('corporateOffice')}
                </h3>
                
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl hover:shadow-md transition group border border-gray-100">
                  <div className="w-12 h-12 bg-seppa-blue/5 text-seppa-red rounded-full flex items-center justify-center text-xl shrink-0 group-hover:bg-seppa-red group-hover:text-white transition shadow-sm">
                    <FiMapPin />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Address</h4>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">{address}</p>
                  </div>
                </div>

                <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex items-start gap-4 p-5 bg-white rounded-2xl hover:shadow-md transition group border border-gray-100">
                  <div className="w-12 h-12 bg-seppa-blue/5 text-seppa-red rounded-full flex items-center justify-center text-xl shrink-0 group-hover:bg-seppa-red group-hover:text-white transition shadow-sm">
                    <FiPhoneCall />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Phone</h4>
                    <p className="text-gray-700 text-sm md:text-base">{phone}</p>
                  </div>
                </a>

                <a href={`mailto:${email}`} className="flex items-start gap-4 p-5 bg-white rounded-2xl hover:shadow-md transition group border border-gray-100">
                  <div className="w-12 h-12 bg-seppa-blue/5 text-seppa-red rounded-full flex items-center justify-center text-xl shrink-0 group-hover:bg-seppa-red group-hover:text-white transition shadow-sm">
                    <FiMail />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Email</h4>
                    <p className="text-gray-700 text-sm md:text-base">{email}</p>
                  </div>
                </a>
              </motion.div>

              {/* India Office details */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="text-xl font-bold font-heading text-seppa-blue border-b border-gray-200 pb-2">
                  Corporate Office
                </h3>

                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl hover:shadow-md transition group border border-gray-100">
                  <div className="w-12 h-12 bg-seppa-blue/5 text-seppa-red rounded-full flex items-center justify-center text-xl shrink-0 group-hover:bg-seppa-red group-hover:text-white transition shadow-sm">
                    <FiMapPin />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Address</h4>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">{indiaAddress}</p>
                  </div>
                </div>

                <a href={`tel:${indiaPhone.replace(/[^\d+]/g, '')}`} className="flex items-start gap-4 p-5 bg-white rounded-2xl hover:shadow-md transition group border border-gray-100">
                  <div className="w-12 h-12 bg-seppa-blue/5 text-seppa-red rounded-full flex items-center justify-center text-xl shrink-0 group-hover:bg-seppa-red group-hover:text-white transition shadow-sm">
                    <FiPhoneCall />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Phone</h4>
                    <p className="text-gray-700 text-sm md:text-base">{indiaPhone}</p>
                  </div>
                </a>

                <a href={`mailto:${indiaEmail}`} className="flex items-start gap-4 p-5 bg-white rounded-2xl hover:shadow-md transition group border border-gray-100">
                  <div className="w-12 h-12 bg-seppa-blue/5 text-seppa-red rounded-full flex items-center justify-center text-xl shrink-0 group-hover:bg-seppa-red group-hover:text-white transition shadow-sm">
                    <FiMail />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Email</h4>
                    <p className="text-gray-700 text-sm md:text-base">{indiaEmail}</p>
                  </div>
                </a>
              </motion.div>
            </motion.div>
              
            {/* Contact Form (Right Column) */}
            <motion.div 
              className="w-full lg:w-7/12"
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
