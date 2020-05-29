import React from 'react'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <p style={{ fontFamily: 'IBM Plex Mono' }}>Hello world</p>
    <p style={{ fontFamily: 'IBM Plex Sans' }}>Hello world</p>
    <p style={{ fontFamily: 'IBM Plex Serif' }}>Hello world</p>
    <p style={{ fontFamily: 'IBM Plex Sans Condensed' }}>Hello world</p>
    <p style={{ fontFamily: 'IBM Plex Sans Hebrew' }}>שלום עולם</p>
    <p style={{ fontFamily: 'IBM Plex Sans Arabic' }}>مرحبا بالعالم</p>
    <p style={{ fontFamily: 'IBM Plex Sans Thai' }}>สวัสดีชาวโลก</p>
    <p style={{ fontFamily: 'IBM Plex Sans Thai Looped' }}>สวัสดีชาวโลก</p>
    <p style={{ fontFamily: 'IBM Plex Sans Devanagari' }}>नमस्ते दुनिया</p>
  </Layout>
)

export default IndexPage
