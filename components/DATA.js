import React from 'react'

//Sub-Venue images (The header photo above the locations)
import insideVista from '../assets/vistaGrande/insidevgs.jpg'
import insideNinteen from '../assets/1901Market/insidenineteen.jpg'
import insideMarket from '../assets/campusmarket.jpg';
import insidePcv from '../assets/pcvMarket/insidepcv.jpg'


//Venue images
import newmarket from '../assets/1901.jpg'
import vgs from '../assets/vg.jpg'
import pcv from '../assets/pcv.jpg'
import campusmarket from '../assets/campusmarket.jpg'

// Vista restraunt images
import balance from '../assets/vistaGrande/balance.jpg'
import brunch from '../assets/vistaGrande/brunch.jpg'
import noodles from '../assets/vistaGrande/noodles.jpg'
import hearth from '../assets/vistaGrande/balance.jpg'
import sweets from '../assets/vistaGrande/sweets.jpg'
import jamba from  '../assets/vistaGrande/jamba.jpg'
import deli from  '../assets/vistaGrande/deli.jpg'

// 1901 restraunt images
import chickfila from '../assets/1901Market/chickfila.jpg'
import pandaexpress from '../assets/1901Market/pandaexpress.jpg'
import picos from '../assets/1901Market/picos.jpg'
import polydeli from '../assets/1901Market/polydeli.jpg'
import pomHoney from '../assets/1901Market/pom&honey.jpg'
import redradish from '../assets/1901Market/redradish.jpg'
import julians from '../assets/1901Market/julians.jpg'

// Pcv restraunt images
import subway from '../assets/pcvMarket/subway.jpg'
import tacobell from '../assets/pcvMarket/tacobell.jpg'
import einstein from '../assets/pcvMarket/einsteinbros.jpg'

//Campus Market
import CampusMarketGrill from '../assets/CampusMarket/CampusMarketGrill.jpg'
import Starbucks from '../assets/CampusMarket/Starbucks.jpeg'

export default function DATA() {
  return (
    <Text>Nothing goes here </Text>
  )
}

// Mock Objects... If you want to add one follow the format of already previous objects

export const venueList = [
    {
        VenueID: null,
        Name: "Vista Grande",
        Address: "1 Grand Ave Building 112, San Luis Obispo, CA 93407",
        Image: vgs,
        SubImage: insideVista
    },
    {
        VenueID: null,
        Name: "1901 Marketplace",
        Address: "Campus Dining, 1 Grand Ave, San Luis Obispo, CA 93407",
        Image: newmarket,
        SubImage: insideNinteen
    },
    {
        VenueID: null,
        Name: "West Campus Neighborhood",
        Address: "California Polytechnic State University, Food Processing and Market, Via Carta, San Luis Obispo, CA 93405",
        Image: campusmarket,
        SubImage: insideMarket
    },

]
//-----------------------------------------------------------------------------------
export const locationList = [
    {
        ParentVenue: "Vista Grande",
        LocationID: null,
        VenueID: null,
        Name: 'Balance Café',
        Image: balance,
    },
    {
        ParentVenue: "Vista Grande",
        LocationID: null,
        VenueID: null,
        Name: 'Brunch',
        Image: brunch,
    },
    {
        ParentVenue: "Vista Grande",
        LocationID: null,
        VenueID: null,
        Name: 'Hearth',
        Image: hearth,
    },
    {
        ParentVenue: "Vista Grande",
        LocationID: null,
        VenueID: null,
        Name: 'Noodles',
        Image: noodles
    },
    {
        ParentVenue: "Vista Grande",
        LocationID: null,
        VenueID: null,
        Name: 'Jamba',
        Image: jamba
    },
    {
        ParentVenue: "1901 Marketplace",
        LocationID: null,
        VenueID: null,
        Name: 'Chick-Fil-A',
        Image: chickfila

    },
    {
        ParentVenue: "1901 Marketplace",
        LocationID: null,
        VenueID: null,
        Name: 'Panda Express',
        Image: pandaexpress
    },
    {
        ParentVenue: "1901 Marketplace",
        LocationID: null,
        VenueID: null,
        Name: 'Picos',
        Image: picos
    },
    {
        ParentVenue: "1901 Marketplace",
        LocationID: null,
        VenueID: null,
        Name: 'Poly Deli',
        Image: polydeli
    },
    {
        ParentVenue: "1901 Marketplace",
        LocationID: null,
        VenueID: null,
        Name: 'Pom & Honey',
        Image: pomHoney
    },
    {
        ParentVenue: "1901 Marketplace",
        LocationID: null,
        VenueID: null,
        Name: 'Red Radish',
        Image: redradish
    },

    {
        ParentVenue: "1901 Marketplace",
        LocationID: null,
        VenueID: null,
        Name: "Julian's",
        Image: julians
    },
    {
        ParentVenue: "West Campus Neighborhood",
        LocationID: null,
        VenueID: null,
        Name: "Grill at Campus Market",
        Image: CampusMarketGrill
    },
    {
        ParentVenue: "West Campus Neighborhood",
        LocationID: null,
        VenueID: null,
        Name: "Starbucks at Campus Market",
        Image: Starbucks
    },
    {
        ParentVenue: "West Campus Neighborhood",
        LocationID: null,
        VenueID: null,
        Name: "Subway at Kennedy Library",
        Image: subway
    }
]
