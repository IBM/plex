import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <p style={{ fontFamily: 'IBM Plex Mono' }}>Hello world</p>
    <p style={{ fontFamily: 'IBM Plex Sans' }}>Hello world</p>
    <p style={{ fontFamily: 'IBM Plex Serif' }}>Hello world</p>
    <p style={{ fontFamily: 'IBM Plex Sans Condensed' }}>Hello world</p>
    <p style={{ fontFamily: 'IBM Plex Sans Hebrew' }}>שלום עולם</p>
    <p style={{ fontFamily: 'IBM Plex Arabic' }}>مرحبا بالعالم</p>
    <p style={{ fontFamily: 'IBM Plex Thai' }}>สวัสดีชาวโลก</p>
    <p style={{ fontFamily: 'IBM Plex Sans Thai Looped' }}>สวัสดีชาวโลก</p>
    <p style={{ fontFamily: 'IBM Plex Devanagari' }}>नमस्ते दुनिया</p>
  </Layout>
)

export default IndexPage
