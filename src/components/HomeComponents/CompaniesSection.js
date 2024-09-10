import React from 'react';
import CardAnimation from '../../components/Animation/CardAnimation/CardAnimation';

const CompaniesSection = () => {
    const companies = [
        'Company A', 'Company B', 'Company C', 'Company D', 'Company E',
        'Company F', 'Company G', 'Company H', 'Company I', 'Company J',
        'Company K', 'Company L', 'Company M', 'Company N', 'Company O'
    ];

    // Split companies into three rows
    const firstRow = companies.slice(0, 6);
    const middleRow = companies.slice(6, 9);
    const lastRow = companies.slice(9, 15);

    const CompanyLogo = ({ company }) => (
        <div className="bg-gray-200 text-center p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-800">{company}</p>
        </div>
    );

    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Trusted by Leading Companies</h2>
                <div className="space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {firstRow.map((company, index) => (
                            <CardAnimation delay={0.1} >
                                <CompanyLogo key={index} company={company} />
                            </CardAnimation>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {middleRow.map((company, index) => (
                            <CardAnimation delay={0.2} >
                                <CompanyLogo key={index} company={company} />
                            </CardAnimation>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {lastRow.map((company, index) => (
                            <CardAnimation delay={0.3} >
                                <CompanyLogo key={index} company={company} />
                            </CardAnimation>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompaniesSection;