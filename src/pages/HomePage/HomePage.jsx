import React from 'react'
import Banner from '../../components/Banner/bannerHeader/Banner'
import BannerBottom from '../../components/Banner/BannerBottom/BannerBottom'
import Sale from '../../components/Sale/Sale'
import NewArrivals from '../../components/NewArrivals/NewArrivals'
import BestSeller from '../../components/BestSellers/BestSeller'
import YearProduct from '../../components/YearProduct/YearProduct'
import SpecialOffers from '../../components/SpecialOffers/SpecialOffers'
import Titles from '../../components/SectionsTitles/Titles'

const HomePage = () => {
  return (
    <div>
      <Banner />
      <BannerBottom />
      <Sale />
      <Titles title={"New Arrivals"}/>
      <NewArrivals />
      <Titles title={"Best Seller"}/>
      <BestSeller />
      <YearProduct />
      <Titles title={"Special Offers"}/>
      <SpecialOffers />
    </div>
  )
}

export default HomePage
