import React, {useEffect, useState} from 'react'

import Helmet from '../components/Helmet'
import Section, {SectionBody, SectionTitle} from '../components/Section'
import ProductView from '../components/ProductView'

import { productAPI } from '../api/api'
import { useParams } from 'react-router-dom'
import Related from '../components/Related'
import { Container, Row } from 'react-bootstrap'

const Product = props => {

    const {id} = useParams()

    const [product, setProduct] = useState()
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        async function getProduct() {
            
            try {
                const resProduct = await productAPI.getById(id);
                const tempProduct = resProduct.data
                const resRelatedProduct = await productAPI.getAll(`brandIds[]=${tempProduct.brand.id}&take=5`)
                const tempRelatedproducts = resRelatedProduct.data.data
                setProduct(tempProduct)
                setRelatedProducts(tempRelatedproducts)
            } catch (error) {
                alert(error)
            }
        }
        getProduct()
    },[id])


    return (
        product ?
        <Helmet title={product.name}>
            <Container>
                <Section>
                    <SectionBody>
                        <ProductView product={product}/>
                    </SectionBody>
                </Section>
                <Section>
                    <SectionTitle>
                        Khám phá thêm
                    </SectionTitle>
                </Section>
                <Row>
                    {   
                        relatedProducts.map((item) => (
                            <Related
                                    key={item.id}
                                    item={item}
                            />
                        ))
                    }
                </Row>
            </Container>
        </Helmet>
        : <div>loading</div>
    )
}

export default Product
