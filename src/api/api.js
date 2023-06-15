import axios from 'axios';

const axi =  axios.create({
  baseURL: `http://127.0.0.1:3000`
});

const brandAPI = {
  getAll: () => axi.get('/v1/brand?queryType=activate'),
  update: (brand) => 
    axi.put(`/brand/${brand.get('_id')}`, 
      brand,
      {headers: { 'content-type': `multipart/form-data; boundary=${brand._boundary}` }}
    ),
}

const categoryAPI = {
  getAll: () => axi.get('/v1/category?queryType=activate'),
  update: (category) => {
    return axi.put(`/category/${category._id}`,{
      categoryName:category.categoryName,
      categoryImage:category.categoryImage
    })
  }
}

const customerAPI = {
  login: (inputLogin) => axi.post('/v1/auth/login',inputLogin, {
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  register: (inputRegister) => axi.post('/v1/user',inputRegister,{
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  forgotPassword: (email) => axi.post('/customer/forgotpassword', {fromEmail:email}),
  getInfo: (token) => axi.get('/customer/info', {headers: {'x-access-token': token}}),
  updatePassword: (token, newPassword) => axi.patch('/customer/password',{newPassword},{headers: {'x-access-token': token}})
}

const productAPI = {
  getAll: () => axi.get(`/v1/product?queryType=activate`),
  getAndSortBySoldQuantity: (limit) => axi.get(`/warehouse/top/${limit}`),
  search: (searchTerm) => axi.get(`/warehouse?searchTerm=${searchTerm}`),
  getById: (id) => axi.get(`/v1/product/${id}`),
  getByCategoryId : (id) => axi.get(`/warehouse/category/${id}`),
  getPackages: (id) => axi.get(`/v1/product/${id}/package`),
  getBenefits: (id) => axi.get(`/v1/product/${id}/benefit`),
}

const supplierAPI = {
  getAll: () => axi.get('/supplier'),
  update: (supplier) => {
    return axi.put(`/supplier/${supplier._id}`,{
      supplierName:supplier.supplierName,
      address:supplier.address,
      phone:supplier.phone})
  }
}

const exportOrderAPI = {
  getAll: () => axi.get('/exportOrder'),
  getByCustomerId: (token) => axi.get('/exportOrder/customer',{
    headers: {
      "x-access-token": token
    }
  }),
  create: (inputExportOrder) => {
    return axi.post(`/exportOrder`,inputExportOrder)
  }
}

const contactAPI = {
  create: (inputContact) => {
    return axi.post(`/contact`,inputContact)
  }
}

const commentAPI = {
  getAll: (productId) => {
    return axi.get(`/comment/product/${productId}`)
  },
  create: (token,inputComment) => {
    return axi.post('/comment',inputComment,{headers:{'x-access-token': token}})
  }
}
const newsAPI = {
  getAll: () => axi.get(`/v1/news?queryType=activate`),
  create: (createNews) =>
    axi.post(`/v1/news`, createNews, {
      headers: {
        'Content-Type': `application/json`,
      },
    }),
  update: (updateNews) =>
    axi.put(`/v1/news/${updateNews.id}`, updateNews, {
      headers: {
        'Content-Type': `application/json`,
      },
    }),
  delete: (id) => axi.delete(`/v1/news/${id}`),
};

const aboutCompanyAPI = {
  getAll: () => axi.get(`/v1/about-company?queryType=activate`),
  create: (createNews) =>
    axi.post(`/v1/about-company`, createNews, {
      headers: {
        'Content-Type': `application/json`,
      },
    }),
  update: (updateNews) =>
    axi.put(`/v1/about-company/${updateNews.id}`, updateNews, {
      headers: {
        'Content-Type': `application/json`,
      },
    }),
  delete: (id) => axi.delete(`/v1/about-company/${id}`),
};

const solutionAPI = {
  getAll: () => axi.get(`/v1/solution?queryType=activate`),
  create: (createSolution) =>
    axi.post(`/v1/solution`, createSolution, {
      headers: {
        'Content-Type': `application/json`,
      },
    }),
  update: (updateSolution) =>
    axi.put(`/v1/solution/${updateSolution.id}`, updateSolution, {
      headers: {
        'Content-Type': `application/json`,
      },
    }),
  delete: (id) => axi.delete(`/v1/solution/${id}`),
};
export {brandAPI, categoryAPI, customerAPI, productAPI, supplierAPI, exportOrderAPI,contactAPI,commentAPI, newsAPI, aboutCompanyAPI, solutionAPI};