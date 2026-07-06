import { fetchAPI } from '@/lib/api';
import { getLocale, getTranslations } from 'next-intl/server';
import PolicyAccordionCard from '@/components/shared/PolicyAccordionCard';
import CityContactAndAdvantages from '@/components/shared/CityContactAndAdvantages';
import PageHeader from '@/components/layout/PageHeader';

export async function generateMetadata() {
  const locale = await getLocale();
  const fetched = await fetchAPI('/city-pages', {
    locale,
    filters: { slug: { $eq: 'andhra-pradesh' } }
  });
  const data = fetched?.data?.[0];

  return {
    title: data?.cityName ? `${data.cityName} - Government Policies` : 'Andhra Pradesh - Government Policies',
    description: data?.subtitle || 'Important state in southeastern India with abundant IT, pharma, and manufacturing sectors.',
  };
}

export default async function AndhraPradeshPage() {
  const locale = await getLocale();
  const t = await getTranslations('CityPage');
  const fetched = await fetchAPI('/city-pages', {
    locale,
    filters: { slug: { $eq: 'andhra-pradesh' } },
    populate: '*'
  });

  const cityData = fetched?.data?.[0];

  const businessDistricts = cityData?.businessDistricts || [];
  const policies = cityData?.latestPolicies || [];
  const subtitle = cityData?.subtitle || "Important state in southeastern India with abundant IT, pharma, and manufacturing sectors.";
  const cityName = cityData?.cityName || "Andhra Pradesh";

  const getHeaderImages = (): string[] => {
    const bgData = cityData?.headerImage;
    if (!bgData) return [];

    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';

    if (bgData.data) {
      const items = Array.isArray(bgData.data) ? bgData.data : [bgData.data];
      return items.map((item: any) => {
        const url = item?.attributes?.url || item?.url;
        if (!url) return '';
        return url.startsWith('http') ? url : `${API_URL}${url}`;
      }).filter(Boolean);
    }

    const items = Array.isArray(bgData) ? bgData : [bgData];
    return items.map((item: any) => {
      const url = item?.url;
      if (!url) return '';
      return url.startsWith('http') ? url : `${API_URL}${url}`;
    }).filter(Boolean);
  };

  const headerImages = getHeaderImages();

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader 
        title={cityName} 
        subtitle={subtitle}
        bgImage={headerImages.length > 0 ? headerImages : undefined}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: t('majorCities') },
          { name: cityName }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Key Business Districts */}
        {businessDistricts.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-seppa-blue mb-8 text-center md:text-left">{t('keyBusinessDistricts')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {businessDistricts.map((district: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-seppa-blue mb-3">{district.name}</h3>
                  <p className="text-gray-600 mb-6 text-sm h-16">{district.description}</p>
                  {district.companiesCount && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t('taiwaneseCompanies')}</p>
                      <p className="text-2xl font-bold text-orange-500">{district.companiesCount}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Latest Policies & Regulations */}
        {policies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-seppa-blue mb-8 text-center md:text-left">{t('latestPolicies')}</h2>
            <div className="space-y-4">
              {policies.map((policy: any, idx: number) => (
                <PolicyAccordionCard key={idx} policy={policy} showIcon={true} />
              ))}
            </div>
          </div>
        )}

        <CityContactAndAdvantages
          contactInfo={cityData?.contactInfo}
          keyAdvantages={cityData?.keyAdvantages}
        />
      </div>
    </div>
  );
}
