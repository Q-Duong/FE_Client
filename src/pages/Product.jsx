import React, {useEffect, useState} from 'react'

import Helmet from '../components/Helmet'
import Section, {SectionBody, SectionTitle} from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'

import { wareHouseAPI } from '../api/api'
import { useParams } from 'react-router-dom'

const Product = props => {

    const {id} = useParams()

    const [product, setProduct] = useState()
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        async function getProduct() {
            
            try {
                const resProduct = await wareHouseAPI.getById(id);
                const tempProduct = resProduct.data
                const resRelatedProduct = await wareHouseAPI.getByCategoryId(tempProduct.product.category)
                const tempRelatedproducts = resRelatedProduct.data
                setProduct(tempProduct)
                setRelatedProducts(tempRelatedproducts)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getProduct()
    },[id])


    return (
        product ?
        <Helmet title={product.product.productName}>
            <Section>
                <SectionBody>
                    <ProductView product={product}/>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>
                    Khám phá thêm
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            relatedProducts.map((item) => (
                                <ProductCard
                                    item={item}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
        : <div>loading</div>
    )
}

export default Product
