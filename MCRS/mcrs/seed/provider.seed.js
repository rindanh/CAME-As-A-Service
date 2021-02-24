const companyA = {
  name: "Company A (Ltd.)",
  email: "company@a.com",
  password: "password",
  description: "Company A (Ltd.) has been working in apparel and fashion since 1899.",
  industry: "apparel-and-fashion",
  urls: [
    {
      name: "Company Official Site",
      url: "http://example.com"
    }
  ],
  contacts: [
    {
      name: "John Doe",
      role: "Public & Relation Officer",
      description: "Assisting in any inquiries about the company.",
      email: "john.doe@example.com",
      phone: "(+62) 812 345 6789",
      address: "Centrak Park, 679, CL"
    }
  ],
  relatedProviders: ["company-b", "company-c"]
};

const companyB = {
  name: "Company B",
  email: "company@b.com",
  password: "password",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula hendrerit mollis. Sed gravida augue ut interdum placerat. Maecenas posuere enim nibh. Sed lobortis velit sit amet sapien pharetra, a condimentum turpis laoreet. Donec consectetur lacinia nisi, et sagittis lorem laoreet a. Praesent iaculis gravida magna non imperdiet. Mauris pharetra, quam non semper pulvinar, dolor nulla vehicula nisl, ac dignissim lacus sapien vitae tortor. Etiam vitae pharetra libero, nec vulputate metus. Maecenas sed elementum eros. Mauris libero nisl, semper suscipit rhoncus sit amet, iaculis eget dui. Nulla scelerisque diam id mauris mattis, nec lacinia quam lacinia.",
  industry: "tobacco"
};

const companyC = {
  name: "Company C",
  email: "company@c.com",
  password: "password",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula hendrerit mollis. Sed gravida augue ut interdum placerat. Maecenas posuere enim nibh. Sed lobortis velit sit amet sapien pharetra, a condimentum turpis laoreet. Donec consectetur lacinia nisi, et sagittis lorem laoreet a. Praesent iaculis gravida magna non imperdiet. Mauris pharetra, quam non semper pulvinar, dolor nulla vehicula nisl, ac dignissim lacus sapien vitae tortor. Etiam vitae pharetra libero, nec vulputate metus. Maecenas sed elementum eros. Mauris libero nisl, semper suscipit rhoncus sit amet, iaculis eget dui. Nulla scelerisque diam id mauris mattis, nec lacinia quam lacinia.",
  industry: "e-learning"
};

const MBMS1 = {
  name: "MBMS1",
  email: "mbms1@a.com",
  password: "password",
  description: "MBMS1 has been working in apparel and fashion since 1899.",
  industry: "apparel-and-fashion",
  urls: [
    {
      name: "MBMS1 Official Site",
      url: "http://localhost:3500"
    }
  ],
  contacts: [
    {
      name: "John Doe",
      role: "Public & Relation Officer",
      description: "Assisting in any inquiries about the company.",
      email: "john.doe@example.com",
      phone: "(+62) 812 345 6789",
      address: "Centrak Park, 679, CL"
    }
  ],
  relatedProviders: ["company-b", "company-c"]
};

const MBMS2 = {
  name: "MBMS2",
  email: "mbms2@b.com",
  password: "password",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula hendrerit mollis. Sed gravida augue ut interdum placerat. Maecenas posuere enim nibh. Sed lobortis velit sit amet sapien pharetra, a condimentum turpis laoreet. Donec consectetur lacinia nisi, et sagittis lorem laoreet a. Praesent iaculis gravida magna non imperdiet. Mauris pharetra, quam non semper pulvinar, dolor nulla vehicula nisl, ac dignissim lacus sapien vitae tortor. Etiam vitae pharetra libero, nec vulputate metus. Maecenas sed elementum eros. Mauris libero nisl, semper suscipit rhoncus sit amet, iaculis eget dui. Nulla scelerisque diam id mauris mattis, nec lacinia quam lacinia.",
  industry: "tobacco"
};

module.exports = { companyA, companyB, companyC, MBMS1, MBMS2 };
