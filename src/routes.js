import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout'
import NotFoundPage from './pages/NotFoundPage'
import IndexPage from './pages/IndexPage'
import EquipmentPage from './pages/EquipmentPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage} />
    <Route path="equipment" component={EquipmentPage} />
    <Route path="gallery" component={GalleryPage} />
    <Route path="contact" component={ContactPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
)
