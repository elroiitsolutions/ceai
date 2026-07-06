import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { getTranslations } from 'next-intl/server';

interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
}

interface Advantage {
  text: string;
}

interface CityContactAndAdvantagesProps {
  contactInfo?: ContactInfo | null;
  keyAdvantages?: Advantage[] | null;
}

export default async function CityContactAndAdvantages({
  contactInfo,
  keyAdvantages,
}: CityContactAndAdvantagesProps) {
  const t = await getTranslations('CityPage');
  if (!contactInfo && (!keyAdvantages || keyAdvantages.length === 0)) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pb-16">
      {/* Contact Information Card */}
      {contactInfo && (
        <div className="bg-[#0b3573] text-white rounded-xl p-8 lg:p-10 shadow-md">
          <h2 className="text-2xl font-bold mb-8 font-heading tracking-wide">
            {t('contactInformation')}
          </h2>
          <div className="space-y-4 text-gray-200">
            {contactInfo.address && (
              <p>
                <strong className="text-white">{t('officeAddress')}:</strong>{' '}
                {contactInfo.address}
                {contactInfo.city ? `, ${contactInfo.city}` : ''}
                {contactInfo.country ? `, ${contactInfo.country}` : ''}
              </p>
            )}
            {contactInfo.phone && (
              <p>
                <strong className="text-white">{t('phone')}:</strong> {contactInfo.phone}
              </p>
            )}
            {contactInfo.email && (
              <p>
                <strong className="text-white">{t('email')}:</strong> {contactInfo.email}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Key Advantages Card */}
      {keyAdvantages && keyAdvantages.length > 0 && (
        <div className="bg-[#209c4d] text-white rounded-xl p-8 lg:p-10 shadow-md">
          <h2 className="text-2xl font-bold mb-8 font-heading tracking-wide">
            {t('keyAdvantages')}
          </h2>
          <ul className="space-y-4">
            {keyAdvantages.map((advantage, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-orange-400 mt-1 shrink-0 text-lg">
                  <FiCheck />
                </span>
                <span className="text-gray-50">{advantage.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
