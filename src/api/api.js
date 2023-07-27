import axios from 'axios';

const axi =  axios.create({
  baseURL: `https://api.technova.com.vn`
});

const brandAPI = {
  getAll: (query) => axi.get(`/v1/brand?queryType=activate&order=ASC&${query}`),
}

const categoryAPI = {
  getAll: () => axi.get('/v1/category?queryType=activate'),
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
  forgotPassword: (email) => axi.post('/v1/auth/forgot-password', {email}),
  getInfo: (token) => axi.get('/v1/user/info', {headers: {'Authorization': `Bearer ${token}`}}),
  updatePassword: (data) => axi.patch('/v1/auth/update-password',data,{headers: {
    'Content-Type': 'application/json'
  }}),
  update: (data, token) => axi.put(`/v1/user/${data.id}`,data,{headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${token}`
  }})
}

const productAPI = {
  getAll: (filter) => axi.get(`/v1/product?order=DESC&queryType=activate&${filter}`),
  getAndSortBySoldQuantity: (limit) => axi.get(`/warehouse/top/${limit}`),
  search: (searchTerm) => axi.get(`/warehouse?searchTerm=${searchTerm}`),
  getById: (id) => axi.get(`/v1/product/${id}`),
  getByCategoryId : (id) => axi.get(`/warehouse/category/${id}`),
  getPackages: (id) => axi.get(`/v1/product/${id}/package`),
  getBenefits: (id) => axi.get(`/v1/product/${id}/benefit`),
}


const orderAPI = {
  getAll: (token) => axi.get('/v1/order/by-owner?order=DESC',{
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }),
  create: (order, token) => {
    return axi.post(`/v1/order`,order,{
      headers: {
        'Content-Type': `application/json`,
        "Authorization": `Bearer ${token}`
      }
    })
  },
  payMoMo: (input) => {
    return axi.post(`/v1/momo`,input,{
      headers: {
        'Content-Type': `application/json`,
      }
    })
  }
}

const contactAPI = {
  create: (inputContact) => {
    return axi.post(`/v1/mail/contact`,inputContact)
  }
}

const newsAPI = {
  getById: (id) => axi.get(`/v1/news/${id}&order=DESC`),
  getAll: (query) => axi.get(`/v1/news?queryType=activate&${query}`)
};

const aboutCompanyAPI = {
  getById: (id) => axi.get(`/v1/about-company/${id}&order=DESC`),
  getAll: (query) => axi.get(`/v1/about-company?queryType=activate&${query}`),
};

const solutionAPI = {
  getById: (id) => axi.get(`/v1/solution/${id}`),
  getAll: (query) => axi.get(`/v1/solution?order=DESC&queryType=activate&${query}`),
};

const serviceAPI = {
  getById: (id) => axi.get(`/v1/technova-service/${id}`),
  getAll: (query) => axi.get(`/v1/technova-service?order=DESC&queryType=activate&${query}`),
};

const bannerAPI = {
  getAll: () => axi.get(`/v1/banner?order=DESC&queryType=activate`),
};

export { brandAPI, categoryAPI, customerAPI, productAPI, serviceAPI, orderAPI,contactAPI, newsAPI, aboutCompanyAPI, solutionAPI, bannerAPI};
