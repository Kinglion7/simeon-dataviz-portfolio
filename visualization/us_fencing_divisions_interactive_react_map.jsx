import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon paths (required for react-leaflet to work properly)
delete (L.Icon.Default.prototype._getIconUrl);
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// --- Constants ---
const ZOOM_DEFAULTS = {
  INITIAL: 4,
  MIN: 3,
  MAX: 10,
  THRESHOLD: 4,
  INCREMENT: 2,
  MAX_TARGET: 8,
};

const PANEL_CONFIG = {
  WIDTH: 420,
  ANIMATION_DURATION: 300,
  RESIZE_DELAY: 350,
};

const BUBBLE_CONFIG = {
  MIN_RADIUS: 3,
  MAX_RADIUS: 50,
  BASE_MULTIPLIER: 1.8,
  ZOOM_SCALE: 1.2,
};

// --- Division coordinates (accurate center points) ---
const DIVISION_COORDINATES = {
  "New Jersey": [40.0583, -74.4057],
  "New England": [42.0000, -71.5000],
  "Southern California": [34.0522, -118.2437],
  "Virginia": [37.4316, -78.6569],
  "Metropolitan NYC": [40.7128, -74.0060],
  "Central California": [36.7378, -119.7871],
  "Northern California": [38.5816, -121.4944],
  "Western Washington": [47.6062, -122.3321],
  "Georgia": [32.1656, -82.9001],
  "Illinois": [40.6331, -89.3985],
  "North Carolina": [35.7596, -79.0193],
  "Gulf Coast": [29.9511, -90.0715],
  "Connecticut": [41.6032, -73.0877],
  "Colorado": [39.5501, -105.7821],
  "Philadelphia": [39.9526, -75.1652],
  "Michigan": [44.3148, -85.6024],
  "Long Island": [40.7891, -73.1349],
  "Capitol": [38.9072, -77.0369],
  "Orange Coast": [33.6189, -117.9298],
  "San Diego": [32.7157, -117.1611],
  "Oregon": [43.8041, -120.5542],
  "Central Florida": [28.5384, -81.3789],
  "South Texas": [27.5300, -97.8600],
  "North Texas": [32.7767, -96.7970],
  "Maryland": [39.0458, -76.6413],
  "Arizona": [34.0489, -111.0937],
  "Westchester-Rockland": [41.1195, -73.7949],
  "Gold Coast Florida": [26.1224, -80.1373],
  "Minnesota": [46.7296, -94.6859],
  "Indiana": [40.2672, -86.1349],
  "Mountain Valley": [40.7608, -111.8910],
  "South Carolina": [33.8361, -81.1637],
  "Columbus": [39.9612, -82.9988],
  "St. Louis": [38.6270, -90.1994],
  "Utah-Southern Idaho": [41.8000, -112.2000],
  "Northern Ohio": [41.4993, -81.6944],
  "Wisconsin": [43.7844, -88.7879],
  "Hudson-Berkshire": [42.3000, -73.6000],
  "Western Pennsylvania": [40.4406, -79.9959],
  "Gateway Florida": [26.5362, -81.7806],
  "Tennessee": [35.5175, -86.5804],
  "Iowa": [41.8780, -93.0977],
  "Alabama": [32.3182, -86.9023],
  "Northeast": [42.5000, -75.0000],
  "Western New York": [42.8864, -78.8784],
  "Nevada": [38.8026, -116.4194],
  "Kansas": [39.0119, -98.4842],
  "Kentucky": [37.8393, -84.2700],
  "Southwest Ohio": [39.7589, -84.1916],
  "Nebraska-South Dakota": [42.5000, -99.5000],
  "Harrisburg": [40.2732, -76.8867],
  "San Bernardino": [34.1083, -117.2898],
  "Ark-La-Miss": [32.5000, -92.1000],
  "Green Mountain": [44.5588, -72.5778],
  "Inland Empire": [33.9806, -117.3755],
  "Oklahoma": [35.4676, -97.5164],
  "New Mexico": [34.5199, -105.8701],
  "Louisiana": [31.2448, -92.1450],
  "Border Texas": [27.5036, -99.5075],
  "South Jersey": [39.6000, -74.9000],
  "National": [39.8283, -98.5795],
  "Plains Texas": [33.5779, -101.8552],
  "Central Pennsylvania": [40.7934, -77.8600],
  "Alaska": [64.2008, -149.4937],
  "Northeast Pennsylvania": [41.4089, -75.6624],
  "Wyoming": [43.0750, -107.2903],
  "Hawaii": [21.3099, -157.8584],
  "North Coast": [38.4400, -122.7140],
  "None": [39.8283, -98.5795], // Default to US center
};

// --- Helper: US state centroids (fallback for any unmapped divisions) ---
const STATE_CENTROIDS = {
  AL: [32.806671, -86.79113], AK: [64.2008, -149.4937], AZ: [33.729759, -111.431221],
  AR: [34.969704, -92.373123], CA: [36.116203, -119.681564], CO: [39.059811, -105.311104],
  CT: [41.597782, -72.755371], DC: [38.905985, -77.033418], DE: [39.318523, -75.507141],
  FL: [27.766279, -81.686783], GA: [33.040619, -83.643074], HI: [21.3099, -157.8584],
  IA: [42.011539, -93.210526], ID: [44.240459, -114.478828], IL: [40.349457, -88.986137],
  IN: [39.849426, -86.258278], KS: [38.5266, -96.726486], KY: [37.66814, -84.670067],
  LA: [31.169546, -91.867805], MA: [42.230171, -71.530106], MD: [39.063946, -76.802101],
  ME: [44.693947, -69.381927], MI: [43.326618, -84.536095], MN: [45.694454, -93.900192],
  MO: [38.456085, -92.288368], MS: [32.741646, -89.678696], MT: [46.921925, -110.454353],
  NC: [35.630066, -79.806419], ND: [47.528912, -99.784012], NE: [41.12537, -98.268082],
  NH: [43.452492, -71.563896], NJ: [40.298904, -74.521011], NM: [34.840515, -106.248482],
  NV: [38.313515, -117.055374], NY: [42.165726, -74.948051], OH: [40.388783, -82.764915],
  OK: [35.565342, -96.928917], OR: [44.572021, -122.070938], PA: [40.590752, -77.209755],
  RI: [41.680893, -71.51178], SC: [33.856892, -80.945007], SD: [44.299782, -99.438828],
  TN: [35.747845, -86.692345], TX: [31.054487, -97.563461], UT: [40.150032, -111.862434],
  VA: [37.769337, -78.169968], VT: [44.045876, -72.710686], WA: [47.400902, -121.490494],
  WI: [44.268543, -89.616508], WV: [38.491226, -80.954453], WY: [42.755966, -107.30249],
};

// Map division names to an anchor state (heuristic; regions map to a representative state)
const NAME_TO_STATE = {
  "New England": "MA",
  "Metropolitan NYC": "NY",
  "Westchester-Rockland": "NY",
  "Long Island": "NY",
  "Western New York": "NY",
  "Hudson-Berkshire": "MA",
  "Northeast Pennsylvania": "PA",
  "Central Pennsylvania": "PA",
  "Western Pennsylvania": "PA",
  Philadelphia: "PA",
  Harrisburg: "PA",
  "Northern Ohio": "OH",
  "Southwest Ohio": "OH",
  Columbus: "OH",
  "St. Louis": "MO",
  "Northern California": "CA",
  "Central California": "CA",
  "Southern California": "CA",
  "Orange Coast": "CA",
  "San Diego": "CA",
  "San Bernardino": "CA",
  "Inland Empire": "CA",
  "North Coast": "CA",
  Oregon: "OR",
  "Western Washington": "WA",
  Georgia: "GA",
  Illinois: "IL",
  "North Carolina": "NC",
  Connecticut: "CT",
  Colorado: "CO",
  Michigan: "MI",
  Capitol: "DC",
  "Central Florida": "FL",
  "Gold Coast Florida": "FL",
  "Gateway Florida": "FL",
  Arizona: "AZ",
  Maryland: "MD",
  Minnesota: "MN",
  Indiana: "IN",
  "Mountain Valley": "UT",
  "South Carolina": "SC",
  Wisconsin: "WI",
  Tennessee: "TN",
  Iowa: "IA",
  Alabama: "AL",
  Northeast: "NY",
  Nevada: "NV",
  Kansas: "KS",
  Kentucky: "KY",
  "Nebraska-South Dakota": "NE",
  "Ark-La-Miss": "MS",
  "Green Mountain": "VT",
  Oklahoma: "OK",
  "New Mexico": "NM",
  Louisiana: "LA",
  "Border Texas": "TX",
  "South Texas": "TX",
  "North Texas": "TX",
  "Plains Texas": "TX",
  National: "KS",
  Alaska: "AK",
  Wyoming: "WY",
  Hawaii: "HI",
  Virginia: "VA",
  "Gulf Coast": "TX",
  "South Jersey": "NJ",
  "New Jersey": "NJ",
};

const STATE_NAME_TO_ABBR = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA", Colorado: "CO",
  Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA", Hawaii: "HI", Idaho: "ID",
  Illinois: "IL", Indiana: "IN", Iowa: "IA", Kansas: "KS", Kentucky: "KY", Louisiana: "LA",
  Maine: "ME", Maryland: "MD", Massachusetts: "MA", Michigan: "MI", Minnesota: "MN",
  Mississippi: "MS", Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK", Oregon: "OR",
  Pennsylvania: "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD",
  Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT", Virginia: "VA", Washington: "WA",
  "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY", "District of Columbia": "DC",
};

/**
 * Resolves division name to state abbreviation
 * @param {string} name - Division or state name
 * @returns {string} - Two-letter state abbreviation (defaults to "KS")
 */
function resolveStateAbbr(name) {
  if (NAME_TO_STATE[name]) return NAME_TO_STATE[name];
  if (STATE_NAME_TO_ABBR[name]) return STATE_NAME_TO_ABBR[name];
  for (const sname of Object.keys(STATE_NAME_TO_ABBR)) {
    if (name.includes(sname)) return STATE_NAME_TO_ABBR[sname];
  }
  return "KS"; // Geographic center of contiguous US
}

/**
 * A simple seeded hash to generate a deterministic jitter per division name
 * @param {string} name - Division name to generate jitter for
 * @param {number} range - Jitter range (default: 0.7)
 * @returns {[number, number]} - [latJitter, lonJitter] offsets
 */
function seededJitter(name, range = 0.7) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  // Map hash to [-range, +range]
  const randA = ((hash % 1000) / 999) * 2 - 1; // [-1,1]
  const randB = (((hash >> 10) % 1000) / 999) * 2 - 1;
  return [randA * range, randB * range];
}

const REGION_KEYWORDS = [
  "Northern", "Southern", "Western", "Eastern", "Central", "Coast", "Metropolitan",
  "San ", "Westchester", "Long Island", "Gateway", "Gold Coast", "Inland Empire",
  "Border", "Plains", "Northeast", "Hudson", "Rockland", "Mountain", "Valley",
  "National", "Philadelphia", "Harrisburg", "Columbus", "St. Louis", "San Bernardino", "San Diego"
];

function isRegionName(name) {
  if (STATE_NAME_TO_ABBR[name]) return false;
  for (const kw of REGION_KEYWORDS) if (name.includes(kw)) return true;
  return name.trim().split(/\s+/).length > 1;
}

// --- Data ---
// NOTE: You can replace this with a fetch from CSV if desired, but embedding keeps the canvas self-contained.
const RAW = [
  { name: "None", members: 1719, Foil_A:87, Foil_B:68, Foil_C:73, Foil_D:38, Foil_E:52, Epee_A:79, Epee_B:80, Epee_C:57, Epee_D:45, Epee_E:51, Saber_A:54, Saber_B:45, Saber_C:65, Saber_D:43, Saber_E:48 },
  { name: "New Jersey", members: 1648, Foil_A:44, Foil_B:24, Foil_C:24, Foil_D:39, Foil_E:60, Epee_A:57, Epee_B:42, Epee_C:51, Epee_D:52, Epee_E:69, Saber_A:36, Saber_B:30, Saber_C:47, Saber_D:40, Saber_E:74 },
  { name: "New England", members: 1481, Foil_A:42, Foil_B:25, Foil_C:42, Foil_D:41, Foil_E:50, Epee_A:65, Epee_B:44, Epee_C:56, Epee_D:52, Epee_E:65, Saber_A:34, Saber_B:19, Saber_C:20, Saber_D:24, Saber_E:34 },
  { name: "Southern California", members: 1175, Foil_A:16, Foil_B:13, Foil_C:20, Foil_D:19, Foil_E:33, Epee_A:39, Epee_B:34, Epee_C:25, Epee_D:28, Epee_E:29, Saber_A:15, Saber_B:13, Saber_C:18, Saber_D:22, Saber_E:22 },
  { name: "Virginia", members: 1069, Foil_A:11, Foil_B:8, Foil_C:23, Foil_D:30, Foil_E:48, Epee_A:45, Epee_B:35, Epee_C:43, Epee_D:47, Epee_E:50, Saber_A:55, Saber_B:9, Saber_C:19, Saber_D:20, Saber_E:0 },
  { name: "Metropolitan NYC", members: 1052, Foil_A:24, Foil_B:20, Foil_C:26, Foil_D:27, Foil_E:44, Epee_A:54, Epee_B:28, Epee_C:23, Epee_D:21, Epee_E:29, Saber_A:32, Saber_B:23, Saber_C:35, Saber_D:19, Saber_E:27 },
  { name: "Central California", members: 893, Foil_A:26, Foil_B:17, Foil_C:19, Foil_D:17, Foil_E:31, Epee_A:32, Epee_B:30, Epee_C:40, Epee_D:40, Epee_E:35, Saber_A:64, Saber_B:31, Saber_C:31, Saber_D:19, Saber_E:20 },
  { name: "Northern California", members: 848, Foil_A:22, Foil_B:11, Foil_C:25, Foil_D:25, Foil_E:47, Epee_A:22, Epee_B:12, Epee_C:28, Epee_D:19, Epee_E:19, Saber_A:12, Saber_B:48, Saber_C:52, Saber_D:0, Saber_E:0 },
  { name: "Western Washington", members: 739, Foil_A:7, Foil_B:14, Foil_C:16, Foil_D:24, Foil_E:32, Epee_A:25, Epee_B:26, Epee_C:27, Epee_D:30, Epee_E:40, Saber_A:16, Saber_B:14, Saber_C:15, Saber_D:29, Saber_E:0 },
  { name: "Georgia", members: 662, Foil_A:7, Foil_B:28, Foil_C:10, Foil_D:10, Foil_E:17, Epee_A:15, Epee_B:23, Epee_C:18, Epee_D:33, Epee_E:15, Saber_A:17, Saber_B:13, Saber_C:18, Saber_D:27, Saber_E:0 },
  { name: "Illinois", members: 629, Foil_A:14, Foil_B:12, Foil_C:18, Foil_D:27, Foil_E:24, Epee_A:17, Epee_B:29, Epee_C:32, Epee_D:46, Epee_E:29, Saber_A:12, Saber_B:15, Saber_C:25, Saber_D:0, Saber_E:0 },
  { name: "North Carolina", members: 618, Foil_A:43, Foil_B:18, Foil_C:26, Foil_D:37, Foil_E:11, Epee_A:13, Epee_B:25, Epee_C:25, Epee_D:30, Epee_E:57, Saber_A:16, Saber_B:11, Saber_C:19, Saber_D:0, Saber_E:0 },
  { name: "Gulf Coast", members: 599, Foil_A:48, Foil_B:85, Foil_C:32, Foil_D:45, Foil_E:27, Epee_A:24, Epee_B:19, Epee_C:33, Epee_D:30, Epee_E:11, Saber_A:0, Saber_B:3, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Connecticut", members: 575, Foil_A:64, Foil_B:10, Foil_C:13, Foil_D:29, Foil_E:11, Epee_A:10, Epee_B:19, Epee_C:14, Epee_D:27, Epee_E:11, Saber_A:8, Saber_B:11, Saber_C:7, Saber_D:30, Saber_E:0 },
  { name: "Colorado", members: 543, Foil_A:13, Foil_B:10, Foil_C:21, Foil_D:13, Foil_E:21, Epee_A:19, Epee_B:27, Epee_C:49, Epee_D:25, Epee_E:32, Saber_A:17, Saber_B:16, Saber_C:27, Saber_D:8, Saber_E:14 },
  { name: "Philadelphia", members: 524, Foil_A:48, Foil_B:17, Foil_C:9, Foil_D:26, Foil_E:9, Epee_A:14, Epee_B:72, Epee_C:13, Epee_D:6, Epee_E:21, Saber_A:75, Saber_B:13, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Michigan", members: 522, Foil_A:14, Foil_B:21, Foil_C:22, Foil_D:33, Foil_E:39, Epee_A:7, Epee_B:10, Epee_C:15, Epee_D:15, Epee_E:32, Saber_A:3, Saber_B:45, Saber_C:12, Saber_D:0, Saber_E:0 },
  { name: "Long Island", members: 487, Foil_A:9, Foil_B:10, Foil_C:18, Foil_D:23, Foil_E:16, Epee_A:11, Epee_B:14, Epee_C:23, Epee_D:37, Epee_E:25, Saber_A:7, Saber_B:42, Saber_C:1, Saber_D:0, Saber_E:0 },
  { name: "Capitol", members: 472, Foil_A:0, Foil_B:44, Foil_C:9, Foil_D:17, Foil_E:18, Epee_A:12, Epee_B:14, Epee_C:7, Epee_D:19, Epee_E:16, Saber_A:11, Saber_B:14, Saber_C:21, Saber_D:17, Saber_E:0 },
  { name: "Orange Coast", members: 461, Foil_A:15, Foil_B:13, Foil_C:17, Foil_D:17, Foil_E:19, Epee_A:10, Epee_B:57, Epee_C:6, Epee_D:13, Epee_E:15, Saber_A:12, Saber_B:9, Saber_C:7, Saber_D:12, Saber_E:0 },
  { name: "San Diego", members: 439, Foil_A:8, Foil_B:38, Foil_C:9, Foil_D:16, Foil_E:16, Epee_A:19, Epee_B:12, Epee_C:14, Epee_D:15, Epee_E:11, Saber_A:9, Saber_B:9, Saber_C:10, Saber_D:18, Saber_E:0 },
  { name: "Oregon", members: 403, Foil_A:3, Foil_B:4, Foil_C:4, Foil_D:10, Foil_E:20, Epee_A:12, Epee_B:12, Epee_C:11, Epee_D:15, Epee_E:18, Saber_A:8, Saber_B:10, Saber_C:13, Saber_D:12, Saber_E:22 },
  { name: "Central Florida", members: 397, Foil_A:2, Foil_B:21, Foil_C:21, Foil_D:20, Foil_E:8, Epee_A:11, Epee_B:13, Epee_C:9, Epee_D:29, Epee_E:0, Saber_A:0, Saber_B:3, Saber_C:4, Saber_D:5, Saber_E:0 },
  { name: "South Texas", members: 397, Foil_A:4, Foil_B:22, Foil_C:4, Foil_D:6, Foil_E:14, Epee_A:11, Epee_B:23, Epee_C:20, Epee_D:12, Epee_E:23, Saber_A:7, Saber_B:19, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "North Texas", members: 375, Foil_A:4, Foil_B:24, Foil_C:11, Foil_D:8, Foil_E:5, Epee_A:6, Epee_B:7, Epee_C:11, Epee_D:10, Epee_E:12, Saber_A:15, Saber_B:17, Saber_C:23, Saber_D:21, Saber_E:0 },
  { name: "Maryland", members: 341, Foil_A:0, Foil_B:77, Foil_C:23, Foil_D:20, Foil_E:8, Epee_A:8, Epee_B:14, Epee_C:19, Epee_D:21, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Arizona", members: 325, Foil_A:0, Foil_B:24, Foil_C:7, Foil_D:11, Foil_E:4, Epee_A:8, Epee_B:16, Epee_C:19, Epee_D:19, Epee_E:6, Saber_A:3, Saber_B:8, Saber_C:5, Saber_D:5, Saber_E:0 },
  { name: "Westchester-Rockland", members: 324, Foil_A:10, Foil_B:5, Foil_C:28, Foil_D:11, Foil_E:3, Epee_A:6, Epee_B:5, Epee_C:8, Epee_D:8, Epee_E:6, Saber_A:6, Saber_B:4, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Gold Coast Florida", members: 307, Foil_A:4, Foil_B:25, Foil_C:4, Foil_D:6, Foil_E:10, Epee_A:5, Epee_B:9, Epee_C:4, Epee_D:13, Epee_E:22, Saber_A:22, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Minnesota", members: 302, Foil_A:2, Foil_B:21, Foil_C:0, Foil_D:19, Foil_E:3, Epee_A:5, Epee_B:5, Epee_C:8, Epee_D:12, Epee_E:13, Saber_A:9, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Indiana", members: 247, Foil_A:3, Foil_B:12, Foil_C:11, Foil_D:4, Foil_E:11, Epee_A:18, Epee_B:15, Epee_C:16, Epee_D:30, Epee_E:13, Saber_A:13, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Mountain Valley", members: 241, Foil_A:2, Foil_B:11, Foil_C:2, Foil_D:4, Foil_E:7, Epee_A:6, Epee_B:9, Epee_C:8, Epee_D:4, Epee_E:9, Saber_A:10, Saber_B:10, Saber_C:13, Saber_D:14, Saber_E:0 },
  { name: "South Carolina", members: 228, Foil_A:0, Foil_B:0, Foil_C:38, Foil_D:17, Foil_E:0, Epee_A:0, Epee_B:12, Epee_C:10, Epee_D:7, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Columbus", members: 228, Foil_A:3, Foil_B:10, Foil_C:6, Foil_D:5, Foil_E:3, Epee_A:7, Epee_B:6, Epee_C:4, Epee_D:25, Epee_E:13, Saber_A:6, Saber_B:6, Saber_C:12, Saber_D:0, Saber_E:0 },
  { name: "St. Louis", members: 224, Foil_A:0, Foil_B:10, Foil_C:4, Foil_D:17, Foil_E:0, Epee_A:3, Epee_B:6, Epee_C:10, Epee_D:16, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Utah-Southern Idaho", members: 223, Foil_A:1, Foil_B:19, Foil_C:8, Foil_D:14, Foil_E:4, Epee_A:3, Epee_B:14, Epee_C:6, Epee_D:13, Epee_E:20, Saber_A:14, Saber_B:13, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Northern Ohio", members: 220, Foil_A:1, Foil_B:12, Foil_C:8, Foil_D:15, Foil_E:14, Epee_A:11, Epee_B:9, Epee_C:15, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Wisconsin", members: 196, Foil_A:1, Foil_B:12, Foil_C:4, Foil_D:10, Foil_E:3, Epee_A:11, Epee_B:14, Epee_C:15, Epee_D:10, Epee_E:2, Saber_A:13, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Hudson-Berkshire", members: 189, Foil_A:0, Foil_B:16, Foil_C:67, Foil_D:55, Foil_E:15, Epee_A:61, Epee_B:9, Epee_C:33, Epee_D:8, Epee_E:9, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Western Pennsylvania", members: 184, Foil_A:1, Foil_B:16, Foil_C:62, Foil_D:70, Foil_E:13, Epee_A:6, Epee_B:7, Epee_C:10, Epee_D:11, Epee_E:2, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Gateway Florida", members: 181, Foil_A:2, Foil_B:14, Foil_C:8, Foil_D:7, Foil_E:35, Epee_A:9, Epee_B:4, Epee_C:10, Epee_D:10, Epee_E:6, Saber_A:1, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Tennessee", members: 178, Foil_A:0, Foil_B:22, Foil_C:13, Foil_D:13, Foil_E:25, Epee_A:7, Epee_B:8, Epee_C:19, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Iowa", members: 162, Foil_A:0, Foil_B:0, Foil_C:5, Foil_D:15, Foil_E:0, Epee_A:16, Epee_B:6, Epee_C:11, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Alabama", members: 160, Foil_A:5, Foil_B:4, Foil_C:6, Foil_D:4, Foil_E:3, Epee_A:2, Epee_B:8, Epee_C:12, Epee_D:8, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Northeast", members: 158, Foil_A:0, Foil_B:0, Foil_C:27, Foil_D:20, Foil_E:13, Epee_A:5, Epee_B:10, Epee_C:14, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Western New York", members: 154, Foil_A:2, Foil_B:0, Foil_C:6, Foil_D:4, Foil_E:9, Epee_A:4, Epee_B:1, Epee_C:20, Epee_D:5, Epee_E:11, Saber_A:22, Saber_B:6, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Nevada", members: 132, Foil_A:0, Foil_B:0, Foil_C:0, Foil_D:0, Foil_E:0, Epee_A:11, Epee_B:12, Epee_C:12, Epee_D:7, Epee_E:9, Saber_A:0, Saber_B:2, Saber_C:3, Saber_D:3, Saber_E:0 },
  { name: "Kansas", members: 119, Foil_A:1, Foil_B:10, Foil_C:27, Foil_D:12, Foil_E:5, Epee_A:4, Epee_B:10, Epee_C:0, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Kentucky", members: 117, Foil_A:6, Foil_B:3, Foil_C:2, Foil_D:17, Foil_E:7, Epee_A:7, Epee_B:5, Epee_C:9, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Southwest Ohio", members: 110, Foil_A:2, Foil_B:4, Foil_C:8, Foil_D:7, Foil_E:6, Epee_A:3, Epee_B:2, Epee_C:0, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Nebraska-South Dakota", members: 95, Foil_A:0, Foil_B:0, Foil_C:5, Foil_D:12, Foil_E:2, Epee_A:5, Epee_B:6, Epee_C:0, Epee_D:1, Epee_E:3, Saber_A:2, Saber_B:4, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Harrisburg", members: 93, Foil_A:0, Foil_B:10, Foil_C:3, Foil_D:7, Foil_E:11, Epee_A:3, Epee_B:5, Epee_C:4, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "San Bernardino", members: 91, Foil_A:2, Foil_B:1, Foil_C:2, Foil_D:11, Foil_E:10, Epee_A:2, Epee_B:2, Epee_C:2, Epee_D:1, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Ark-La-Miss", members: 81, Foil_A:0, Foil_B:0, Foil_C:0, Foil_D:17, Foil_E:0, Epee_A:20, Epee_B:6, Epee_C:0, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Green Mountain", members: 77, Foil_A:0, Foil_B:0, Foil_C:12, Foil_D:7, Foil_E:24, Epee_A:5, Epee_B:11, Epee_C:0, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Inland Empire", members: 71, Foil_A:0, Foil_B:0, Foil_C:2, Foil_D:4, Foil_E:10, Epee_A:6, Epee_B:3, Epee_C:1, Epee_D:1, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Oklahoma", members: 70, Foil_A:0, Foil_B:0, Foil_C:0, Foil_D:10, Foil_E:4, Epee_A:23, Epee_B:10, Epee_C:6, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "New Mexico", members: 63, Foil_A:0, Foil_B:0, Foil_C:11, Foil_D:0, Foil_E:4, Epee_A:3, Epee_B:4, Epee_C:7, Epee_D:8, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Louisiana", members: 63, Foil_A:0, Foil_B:0, Foil_C:2, Foil_D:4, Foil_E:10, Epee_A:16, Epee_B:11, Epee_C:0, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Border Texas", members: 59, Foil_A:0, Foil_B:13, Foil_C:16, Foil_D:20, Foil_E:28, Epee_A:8, Epee_B:0, Epee_C:0, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "South Jersey", members: 55, Foil_A:0, Foil_B:0, Foil_C:0, Foil_D:10, Foil_E:11, Epee_A:6, Epee_B:0, Epee_C:0, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "National", members: 53, Foil_A:0, Foil_B:50, Foil_C:32, Foil_D:23, Foil_E:22, Epee_A:4, Epee_B:0, Epee_C:0, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Plains Texas", members: 37, Foil_A:0, Foil_B:0, Foil_C:0, Foil_D:0, Foil_E:0, Epee_A:12, Epee_B:4, Epee_C:0, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Central Pennsylvania", members: 32, Foil_A:0, Foil_B:0, Foil_C:0, Foil_D:3, Foil_E:22, Epee_A:10, Epee_B:4, Epee_C:0, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Alaska", members: 32, Foil_A:0, Foil_B:0, Foil_C:0, Foil_D:0, Foil_E:0, Epee_A:0, Epee_B:0, Epee_C:0, Epee_D:0, Epee_E:0, Saber_A:1, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Northeast Pennsylvania", members: 22, Foil_A:0, Foil_B:0, Foil_C:0, Foil_D:2, Foil_E:0, Epee_A:0, Epee_B:1, Epee_C:2, Epee_D:3, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Wyoming", members: 18, Foil_A:0, Foil_B:0, Foil_C:0, Foil_D:0, Foil_E:0, Epee_A:0, Epee_B:1, Epee_C:0, Epee_D:2, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "Hawaii", members: 15, Foil_A:0, Foil_B:0, Foil_C:0, Foil_D:3, Foil_E:1, Epee_A:0, Epee_B:1, Epee_C:2, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
  { name: "North Coast", members: 8, Foil_A:0, Foil_B:0, Foil_C:0, Foil_D:0, Foil_E:0, Epee_A:0, Epee_B:1, Epee_C:1, Epee_D:0, Epee_E:0, Saber_A:0, Saber_B:0, Saber_C:0, Saber_D:0, Saber_E:0 },
];

/**
 * Computes totals per weapon for each division
 * @param {Array} rows - Array of division data objects
 * @returns {Array} - Array with added totalFoil, totalEpee, totalSaber fields
 */
function addTotals(rows) {
  return rows.map((r) => ({
    ...r,
    totalFoil: r.Foil_A + r.Foil_B + r.Foil_C + r.Foil_D + r.Foil_E,
    totalEpee: r.Epee_A + r.Epee_B + r.Epee_C + r.Epee_D + r.Epee_E,
    totalSaber: r.Saber_A + r.Saber_B + r.Saber_C + r.Saber_D + r.Saber_E,
  }));
}

/**
 * Resolves lat/lon for a division using accurate coordinates
 * @param {string} divisionName - Name of the division
 * @returns {[number, number]} - [latitude, longitude]
 */
function positionFor(divisionName) {
  // First check if we have exact coordinates for this division
  if (DIVISION_COORDINATES[divisionName]) {
    return DIVISION_COORDINATES[divisionName];
  }
  
  // Fallback to state centroid if division not found
  const abbr = resolveStateAbbr(divisionName);
  return STATE_CENTROIDS[abbr] ?? STATE_CENTROIDS["KS"];
}

/**
 * Calculates bubble radius based on value and zoom level
 * Size map: area-proportional (radius ~ sqrt(value))
 * Now scales with zoom level to prevent oversized bubbles
 * @param {number} value - The metric value to size by
 * @param {number} zoom - Current map zoom level
 * @param {number} base - Base multiplier (default: 1.8)
 * @returns {number} - Radius in pixels (constrained between 3 and 50)
 */
function radiusFor(value, zoom, base = BUBBLE_CONFIG.BASE_MULTIPLIER) {
  // Scale factor: at zoom 4 (default), factor is 1.0
  // At zoom 6, factor is ~1.5, at zoom 8, factor is ~2.0
  // This keeps bubbles proportional to map scale
  const zoomFactor = Math.pow(BUBBLE_CONFIG.ZOOM_SCALE, zoom - ZOOM_DEFAULTS.INITIAL);
  const calculatedRadius = base * Math.sqrt(Math.max(value, 0)) * zoomFactor;
  // Constrain radius between min and max
  return Math.max(BUBBLE_CONFIG.MIN_RADIUS, Math.min(BUBBLE_CONFIG.MAX_RADIUS, calculatedRadius));
}

// Component to track zoom level
function ZoomTracker({ onZoomChange }) {
  const map = useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom());
    },
  });
  
  useEffect(() => {
    // Set initial zoom level
    onZoomChange(map.getZoom());
  }, []);
  
  return null;
}

/**
 * Calculates adjusted center coordinates accounting for panel width
 * Improved version that handles edge cases and avoids problematic state manipulation
 * @param {Object} map - Leaflet map instance
 * @param {number} targetLat - Target latitude
 * @param {number} targetLon - Target longitude
 * @param {number} targetZoom - Target zoom level
 * @param {number} panelWidth - Width of the side panel (0 if closed)
 * @returns {[number, number]} - [adjustedLat, adjustedLon]
 */
function calculateAdjustedCenter(map, targetLat, targetLon, targetZoom, panelWidth) {
  try {
    const container = map.getContainer();
    if (!container) return [targetLat, targetLon];
    
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    if (containerWidth === 0 || containerHeight === 0) {
      return [targetLat, targetLon];
    }
    
    // If no panel, center directly on target
    if (panelWidth === 0) {
      return [targetLat, targetLon];
    }
    
    // Save current state
    const currentZoom = map.getZoom();
    const currentCenter = map.getCenter();
    
    // Temporarily set zoom to target zoom for accurate calculations
    map.setZoom(targetZoom, { animate: false });
    
    // When map is centered on target, target appears at container center (containerWidth/2)
    // We want target to appear at visible center, which is LEFT of container center
    // Visible center = containerWidth/2 - panelWidth/2
    // To shift target left, we need to shift map center RIGHT
    // So the new center should be at: containerWidth/2 + panelWidth/2
    
    // Set view to target temporarily to establish coordinate system
    map.setView([targetLat, targetLon], targetZoom, { animate: false });
    
    // Calculate the point that should be at container center to put target at visible center
    // This point is panelWidth/2 to the RIGHT of where target currently is
    const targetPoint = map.latLngToContainerPoint([targetLat, targetLon]);
    const newCenterPoint = L.point(
      targetPoint.x + panelWidth / 2,
      targetPoint.y
    );
    
    // Convert that point to lat/lng - that's our adjusted center
    const adjustedCenterLatLng = map.containerPointToLatLng(newCenterPoint);
    const adjustedLat = adjustedCenterLatLng.lat;
    const adjustedLon = adjustedCenterLatLng.lng;
    
    // Restore original state
    map.setView(currentCenter, currentZoom, { animate: false });
    
    // Clamp to reasonable bounds to prevent extreme values
    const clampedLat = Math.max(-90, Math.min(90, adjustedLat));
    const clampedLon = Math.max(-180, Math.min(180, adjustedLon));
    
    return [clampedLat, clampedLon];
  } catch (error) {
    console.warn('Error calculating adjusted center, using target coordinates:', error);
    return [targetLat, targetLon];
  }
}

/**
 * Determines appropriate zoom level for a division location
 * @param {string} divisionName - Name of the division
 * @param {number} currentZoom - Current map zoom level
 * @returns {number} - Appropriate target zoom level
 */
function getTargetZoom(divisionName, currentZoom) {
  // Check if division is in Hawaii or Alaska
  const abbr = resolveStateAbbr(divisionName);
  const isHawaiiOrAlaska = abbr === 'HI' || abbr === 'AK';
  
  // For Hawaii and Alaska, use zoom 6-7 (appropriate for isolated states)
  // For contiguous US, use zoom 7-8 (good detail level)
  const baseZoom = isHawaiiOrAlaska ? 6 : 7;
  
  // If already zoomed in close to or beyond target, use current zoom or slightly higher
  // If zoomed out far, zoom to base level
  if (currentZoom < baseZoom) {
    return baseZoom;
  } else if (currentZoom >= baseZoom && currentZoom < ZOOM_DEFAULTS.MAX_TARGET) {
    // If already at good zoom, zoom in one more level if possible
    return Math.min(currentZoom + 1, ZOOM_DEFAULTS.MAX_TARGET);
  } else {
    // Already at max target zoom, stay there
    return ZOOM_DEFAULTS.MAX_TARGET;
  }
}

/**
 * Component to handle zooming to selected division
 * @param {Object} props - Component props
 * @param {Object|null} props.division - Selected division object
 * @param {boolean} props.isPanelOpen - Whether the side panel is open
 */
function ZoomToDivision({ division, isPanelOpen }) {
  const map = useMap();
  const prevDivisionRef = useRef(null);
  
  // Handle division changes only
  useEffect(() => {
    if (!division || division.name === prevDivisionRef.current) {
      return;
    }
    
    prevDivisionRef.current = division.name;
    
    const [targetLat, targetLon] = positionFor(division.name);
    const currentZoom = map.getZoom();
    const targetZoom = Math.max(6, getTargetZoom(division.name, currentZoom)); // Minimum zoom of 6
    
    // Ensure map is ready
    map.invalidateSize();
    
    const rafId = requestAnimationFrame(() => {
      try {
        const panelWidth = isPanelOpen ? PANEL_CONFIG.WIDTH : 0;
        const adjustedCenter = calculateAdjustedCenter(
          map, 
          targetLat, 
          targetLon, 
          targetZoom, 
          panelWidth
        );
        
        map.flyTo(adjustedCenter, targetZoom, {
          duration: 1.5,
          easeLinearity: 0.1,
        });
      } catch (error) {
        console.warn('Error flying to division location:', error);
        // Fallback to simple setView if flyTo fails
        map.setView([targetLat, targetLon], targetZoom, {
          animate: true,
          duration: 1.5,
        });
      }
    });
    
    return () => cancelAnimationFrame(rafId);
  }, [division, map, isPanelOpen]);
  
  // Reset ref when division cleared
  useEffect(() => {
    if (!division) {
      prevDivisionRef.current = null;
    }
  }, [division]);
  
  return null;
}

/**
 * Component to handle map resize when panel opens/closes
 * @param {Object} props - Component props
 * @param {boolean} props.isPanelOpen - Whether the side panel is open
 */
function MapResizer({ isPanelOpen }) {
  const map = useMap();
  
  useEffect(() => {
    // Small delay to allow CSS transition to complete
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, PANEL_CONFIG.RESIZE_DELAY);
    
    return () => clearTimeout(timer);
  }, [isPanelOpen, map]);
  
  return null;
}

// Weapon configuration - single source of truth
const WEAPON_CONFIG = {
  Foil: {
    color: '#2ca02c',
    bgClass: 'bg-green-100',
    bgClassNormal: 'bg-green-50',
    textClass: 'text-green-800',
    textClassNormal: 'text-green-700',
    borderClass: 'border-green-300',
    borderClassNormal: 'border-green-200',
    ratings: ['Foil_A', 'Foil_B', 'Foil_C', 'Foil_D', 'Foil_E'],
    barColors: ['bg-green-600', 'bg-green-500', 'bg-green-400', 'bg-green-300', 'bg-green-200'],
  },
  Epee: {
    color: '#ff7f0e',
    bgClass: 'bg-orange-100',
    bgClassNormal: 'bg-orange-50',
    textClass: 'text-orange-800',
    textClassNormal: 'text-orange-700',
    borderClass: 'border-orange-300',
    borderClassNormal: 'border-orange-200',
    ratings: ['Epee_A', 'Epee_B', 'Epee_C', 'Epee_D', 'Epee_E'],
    barColors: ['bg-orange-600', 'bg-orange-500', 'bg-orange-400', 'bg-orange-300', 'bg-orange-200'],
  },
  Saber: {
    color: '#d62728',
    bgClass: 'bg-red-100',
    bgClassNormal: 'bg-red-50',
    textClass: 'text-red-800',
    textClassNormal: 'text-red-700',
    borderClass: 'border-red-300',
    borderClassNormal: 'border-red-200',
    ratings: ['Saber_A', 'Saber_B', 'Saber_C', 'Saber_D', 'Saber_E'],
    barColors: ['bg-red-600', 'bg-red-500', 'bg-red-400', 'bg-red-300', 'bg-red-200'],
  },
};

/**
 * Gets weapon data for a division using WEAPON_CONFIG
 * @param {Object} division - Division data object
 * @returns {Array} - Array of weapon objects with all configuration
 */
function getWeaponData(division) {
  return Object.entries(WEAPON_CONFIG).map(([name, config]) => ({
    name,
    total: division[`total${name}`],
    color: config.color,
    ...config,
    ratings: config.ratings.map((key, idx) => ({
      label: ['A', 'B', 'C', 'D', 'E'][idx],
      value: division[key],
      color: config.barColors[idx],
    })),
  }));
}

/**
 * Gets the most popular weapon for a specific division
 * @param {Object} division - Division data object
 * @returns {Object} - Weapon object with name, total, key, and color
 */
function getMostPopularWeaponForDivision(division) {
  const weapons = [
    { name: 'Foil', total: division.totalFoil, key: 'totalFoil', color: WEAPON_CONFIG.Foil.color },
    { name: 'Epee', total: division.totalEpee, key: 'totalEpee', color: WEAPON_CONFIG.Epee.color },
    { name: 'Saber', total: division.totalSaber, key: 'totalSaber', color: WEAPON_CONFIG.Saber.color },
  ];
  
  // Find weapon with highest total, default to first if all are 0
  return weapons.reduce((max, w) => w.total > max.total ? w : max, weapons[0]);
}

/**
 * Component to display weapon statistics for a division
 * @param {Object} props - Component props
 * @param {Object} props.division - Division data object
 */
function WeaponStatistics({ division }) {
  const weapons = useMemo(() => getWeaponData(division), [division]);
  const sortedWeapons = useMemo(
    () => [...weapons].sort((a, b) => b.total - a.total),
    [weapons]
  );
  const maxTotal = useMemo(
    () => Math.max(...weapons.map(w => w.total)),
    [weapons]
  );
  
  return (
    <div className="space-y-4">
      {/* Visual Comparison Bar Chart */}
      <div className="mb-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Weapon Popularity by Rated Fencers</div>
        <div className="space-y-2.5">
          {sortedWeapons.map((weapon, idx) => {
            const percentage = maxTotal > 0 ? (weapon.total / maxTotal) * 100 : 0;
            const isMostPopular = idx === 0 && weapon.total > 0;
            
            return (
              <div key={weapon.name} className="space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: weapon.color }}></span>
                    <span className={`text-sm font-bold ${isMostPopular ? 'text-gray-900' : 'text-gray-700'}`}>
                      {weapon.name}
                    </span>
                    {isMostPopular && (
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold border border-yellow-300">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <span className={`text-sm font-bold ${isMostPopular ? 'text-gray-900' : 'text-gray-600'}`}>
                    {weapon.total}
                  </span>
                </div>
                <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isMostPopular ? 'shadow-md' : ''}`}
                    style={{
                      width: `${percentage}%`,
                      background: weapon.color,
                      opacity: isMostPopular ? 1 : 0.7,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rating Distribution Table */}
      <div className="mt-4">
        <div className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Rating Distribution</div>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Weapon
                </th>
                {['A', 'B', 'C', 'D', 'E'].map((letter) => (
                  <th
                    key={letter}
                    className="text-center py-2 px-2 text-xs font-semibold text-gray-600 uppercase tracking-wide border-l border-gray-200"
                  >
                    {letter}
                  </th>
                ))}
                <th className="text-right py-2 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wide border-l border-gray-200">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedWeapons.map((weapon, rowIdx) => {
                const isMostPopular = rowIdx === 0 && weapon.total > 0;
                
                return (
                  <tr
                    key={weapon.name}
                    className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                      isMostPopular ? 'bg-yellow-50/30' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full shadow-sm flex-shrink-0"
                          style={{ background: weapon.color }}
                        ></span>
                        <span className={`text-sm font-bold ${isMostPopular ? 'text-gray-900' : 'text-gray-800'}`}>
                          {weapon.name}
                        </span>
                        {isMostPopular && (
                          <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-bold border border-yellow-300">
                            ⭐
                          </span>
                        )}
                      </div>
                    </td>
                    {weapon.ratings.map((rating) => (
                      <td
                        key={rating.label}
                        className={`text-center py-2.5 px-2 border-l border-gray-100 ${
                          rating.value === 0 ? 'text-gray-400' : 'text-gray-900'
                        }`}
                      >
                        <span className="text-sm font-bold tabular-nums">{rating.value}</span>
                      </td>
                    ))}
                    <td className="text-right py-2.5 px-3 border-l border-gray-200">
                      <span className={`text-sm font-bold tabular-nums ${
                        isMostPopular ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {weapon.total}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const METRICS = [
  { key: "members", label: "Total Members", color: "#1f77b4" },
  { key: "totalFoil", label: "Foil Rated", color: "#2ca02c" },
  { key: "totalEpee", label: "Epee Rated", color: "#ff7f0e" },
  { key: "totalSaber", label: "Saber Rated", color: "#d62728" },
  { key: "mostPopularWeapon", label: "Most Popular Weapon", color: "#9467bd", isSpecial: true },
];

/**
 * Component to display top 5 divisions for the current metric
 * @param {Object} props - Component props
 * @param {Array} props.rows - Array of division data
 * @param {string} props.metricKey - Current metric key
 * @param {Function} props.onDivisionClick - Callback when a division is clicked
 */
function Top5List({ rows, metricKey, onDivisionClick }) {
  const currentMetric = METRICS.find(m => m.key === metricKey);
  
  const top5 = useMemo(() => {
    if (!currentMetric) return [];
    
    // Filter out "None" and get value for each division
    const divisionsWithValues = rows
      .filter(r => r.name !== "None")
      .map(r => {
        let value;
        if (metricKey === "mostPopularWeapon") {
          const mostPopular = getMostPopularWeaponForDivision(r);
          value = mostPopular.total;
        } else {
          value = r[metricKey] || 0;
        }
        return { ...r, metricValue: value };
      })
      .filter(r => r.metricValue > 0) // Only show divisions with non-zero values
      .sort((a, b) => b.metricValue - a.metricValue)
      .slice(0, 5);
    
    return divisionsWithValues;
  }, [rows, metricKey, currentMetric]);
  
  if (top5.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <span 
          className="inline-block w-3 h-3 rounded-full" 
          style={{ background: currentMetric.color }}
        />
        <h2 className="text-lg font-semibold text-gray-900">
          Top 5 Divisions: {currentMetric.label}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {top5.map((division, index) => (
          <button
            key={division.name}
            onClick={() => onDivisionClick(division)}
            className="text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-gray-50 hover:bg-white group"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl font-bold text-gray-400 group-hover:text-gray-600">
                #{index + 1}
              </span>
              <span 
                className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                style={{ background: currentMetric.color }}
              />
            </div>
            <div className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {division.name}
            </div>
            <div className="text-2xl font-bold" style={{ color: currentMetric.color }}>
              {division.metricValue.toLocaleString()}
            </div>
            {metricKey === "mostPopularWeapon" && (
              <div className="text-xs text-gray-500 mt-1">
                {getMostPopularWeaponForDivision(division).name}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Error Boundary component to catch map rendering errors
 */
class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Map rendering error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[70vh] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Map Loading Error
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Unable to render the map. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default function USFencingMap() {
  const [metricKey, setMetricKey] = useState("members");
  const [zoom, setZoom] = useState(ZOOM_DEFAULTS.INITIAL);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLegendVisible, setIsLegendVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllWeaponsOverlay, setShowAllWeaponsOverlay] = useState(false);
  const panelRef = useRef(null);
  const rows = useMemo(() => addTotals(RAW), []);
  
  // Debug: Check if component is mounting
  useEffect(() => {
    console.log('USFencingMap component mounted');
  }, []);
  
  // Filter rows based on search term
  const filteredRows = useMemo(
    () => rows.filter(r => 
      r.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [rows, searchTerm]
  );
  
  // Export data to CSV
  const exportData = useCallback(() => {
    const csv = [
      ['Division', 'Members', 'Foil Total', 'Epee Total', 'Saber Total'].join(','),
      ...rows
        .filter(r => r.name !== "None")
        .map(r => 
          `${r.name},${r.members},${r.totalFoil},${r.totalEpee},${r.totalSaber}`
        )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fencing-divisions.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, [rows]);
  
  // Memoize marker data for performance
  const markerData = useMemo(() => {
    if (showAllWeaponsOverlay) {
      // Show all three weapon bubbles for each division
      const markers = [];
      filteredRows
        .filter((r) => r.name !== "None")
        .forEach((r) => {
          const [baseLat, baseLon] = positionFor(r.name);
          
          // Create a bubble for each weapon type with slight offsets
          const weapons = [
            { name: 'Foil', total: r.totalFoil, color: WEAPON_CONFIG.Foil.color, offset: [-0.15, -0.15] },
            { name: 'Epee', total: r.totalEpee, color: WEAPON_CONFIG.Epee.color, offset: [0.15, -0.15] },
            { name: 'Saber', total: r.totalSaber, color: WEAPON_CONFIG.Saber.color, offset: [0, 0.15] },
          ];
          
          weapons.forEach((weapon) => {
            if (weapon.total > 0) {
              // Apply small offset to prevent complete overlap
              const [latOffset, lonOffset] = weapon.offset;
              const lat = baseLat + latOffset * (0.3 / Math.max(zoom - 3, 1)); // Scale offset by zoom
              const lon = baseLon + lonOffset * (0.3 / Math.max(zoom - 3, 1));
              
              const radius = radiusFor(weapon.total, zoom);
              markers.push({
                r,
                lat,
                lon,
                radius,
                bubbleColor: weapon.color,
                displayLabel: `${weapon.name}: ${weapon.total}`,
                weaponType: weapon.name,
              });
            }
          });
        });
      
      return markers;
    } else {
      // Normal single bubble mode
      return filteredRows
        .filter((r) => r.name !== "None")
        .map((r) => {
          const [lat, lon] = positionFor(r.name);
          const mDef = METRICS.find((m) => m.key === metricKey);
          if (!mDef) return null;
          
          // Handle special "mostPopularWeapon" metric
          let value, displayLabel, bubbleColor;
          if (metricKey === "mostPopularWeapon") {
            const mostPopular = getMostPopularWeaponForDivision(r);
            value = mostPopular.total;
            displayLabel = `Most Popular: ${mostPopular.name} (${value})`;
            bubbleColor = mostPopular.color;
          } else {
            value = r[metricKey] || 0;
            displayLabel = `${mDef.label}: ${value}`;
            bubbleColor = mDef.color;
          }
          
          const radius = radiusFor(value, zoom);
          
          return { r, lat, lon, radius, bubbleColor, displayLabel };
        })
        .filter(Boolean);
    }
  }, [filteredRows, metricKey, zoom, showAllWeaponsOverlay]);
  
  const handleMarkerClick = useCallback((division) => {
    setSelectedDivision(division);
    setIsPanelOpen(true);
  }, []);

  const closePanelTimeoutRef = useRef(null);
  
  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    // Clear any existing timeout
    if (closePanelTimeoutRef.current) {
      clearTimeout(closePanelTimeoutRef.current);
    }
    // Delay clearing selectedDivision to allow exit animation
    closePanelTimeoutRef.current = setTimeout(() => {
      setSelectedDivision(null);
      closePanelTimeoutRef.current = null;
    }, PANEL_CONFIG.ANIMATION_DURATION);
  }, []);
  
  // Focus management for accessibility
  useEffect(() => {
    if (isPanelOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isPanelOpen]);
  
  // Keyboard navigation - ESC to close panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPanelOpen) {
        handleClosePanel();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen, handleClosePanel]);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closePanelTimeoutRef.current) {
        clearTimeout(closePanelTimeoutRef.current);
      }
    };
  }, []);

  // Early return if no data
  if (!rows || rows.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-sm text-gray-600">Preparing map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <header className="mb-3">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">US Fencing Divisions — Interactive Bubble Map</h1>
              <p className="text-sm text-gray-600 mt-1">Toggle a metric to size the circles by members or rated fencers per weapon.</p>
            </div>
            <button
              onClick={exportData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              aria-label="Export data to CSV"
            >
              Export CSV
            </button>
          </div>
        </header>

        {/* Search/Filter */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search divisions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search divisions"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="ml-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </div>

        {/* Metric selector and overlay toggle */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {METRICS.map((m) => (
            <button
              key={m.key}
              onClick={() => {
                setMetricKey(m.key);
                if (m.key !== "mostPopularWeapon") {
                  setShowAllWeaponsOverlay(false); // Disable overlay when selecting non-weapon metric
                }
              }}
              disabled={showAllWeaponsOverlay && m.key !== "mostPopularWeapon"}
              className={
                "px-3 py-1.5 rounded-xl text-sm border transition shadow-sm " +
                (metricKey === m.key
                  ? "bg-white border-gray-300 text-gray-900"
                  : "bg-gray-100 border-transparent text-gray-600 hover:bg-gray-200") +
                (showAllWeaponsOverlay && m.key !== "mostPopularWeapon" ? " opacity-50 cursor-not-allowed" : "")
              }
              style={{ outlineColor: m.color }}
              aria-pressed={metricKey === m.key}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 align-middle" style={{ background: m.color }} />
              {m.label}
            </button>
          ))}
          
          {/* All Weapons Overlay Toggle */}
          <button
            onClick={() => {
              setShowAllWeaponsOverlay(!showAllWeaponsOverlay);
              if (!showAllWeaponsOverlay) {
                setMetricKey("mostPopularWeapon"); // Switch to weapon metric when enabling overlay
              }
            }}
            className={
              "px-3 py-1.5 rounded-xl text-sm border transition shadow-sm flex items-center gap-2 " +
              (showAllWeaponsOverlay
                ? "bg-blue-100 border-blue-300 text-blue-900"
                : "bg-gray-100 border-transparent text-gray-600 hover:bg-gray-200")
            }
            aria-pressed={showAllWeaponsOverlay}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>Show All Weapons</span>
            {showAllWeaponsOverlay && (
              <span className="ml-1 px-1.5 py-0.5 bg-blue-200 text-blue-800 rounded text-xs font-bold">
                ON
              </span>
            )}
          </button>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow ring-1 ring-black/5">
          {/* Map Container - Shifts Right When Panel Opens */}
          <MapErrorBoundary>
          <div 
            className={`relative w-full transition-all duration-300 ease-out ${
              isPanelOpen ? 'ml-[420px]' : 'ml-0'
            }`}
            style={{ transitionDuration: `${PANEL_CONFIG.ANIMATION_DURATION}ms` }}
          >
          <MapContainer
            center={[39.8283, -98.5795]}
            zoom={ZOOM_DEFAULTS.INITIAL}
            minZoom={ZOOM_DEFAULTS.MIN}
            maxZoom={ZOOM_DEFAULTS.MAX}
            scrollWheelZoom={true}
            zoomAnimation={true}
            zoomAnimationThreshold={ZOOM_DEFAULTS.THRESHOLD}
            fadeAnimation={true}
            maxBounds={[[15, -180], [72, -50]]}
            maxBoundsViscosity={0.5}
            className="h-[70vh] w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomTracker onZoomChange={setZoom} />
            <ZoomToDivision division={selectedDivision} isPanelOpen={isPanelOpen} />
            <MapResizer isPanelOpen={isPanelOpen} />

            {markerData.map(({ r, lat, lon, radius, bubbleColor, displayLabel, weaponType }, index) => (
              <CircleMarker
                key={showAllWeaponsOverlay ? `${r.name}-${weaponType}-${index}` : `${r.name}-${metricKey}`}
                center={[lat, lon]}
                radius={radius}
                pathOptions={{ 
                  color: bubbleColor, 
                  fillColor: bubbleColor, 
                  weight: selectedDivision?.name === r.name ? 3 : 1, 
                  fillOpacity: showAllWeaponsOverlay 
                    ? (selectedDivision?.name === r.name ? 0.7 : 0.5) 
                    : (selectedDivision?.name === r.name ? 0.75 : 0.55)
                }}
                eventHandlers={{
                  click: () => handleMarkerClick(r),
                }}
                aria-label={`View details for ${r.name}${weaponType ? ` - ${weaponType}` : ''}`}
              >
                <Tooltip direction="top" offset={[0, -4]} opacity={0.9} permanent={false}>
                  <div className="text-xs">
                    <b>{r.name}</b>
                    {weaponType && <span className="ml-1">({weaponType})</span>}
                    <br />
                    {displayLabel}
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
            </MapContainer>

            {/* Floating legend */}
            {isLegendVisible && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 pr-8 rounded-xl shadow-lg border border-gray-200 text-sm z-[1000]">
                <button
                  onClick={() => setIsLegendVisible(false)}
                  className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                  aria-label="Close legend"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {showAllWeaponsOverlay ? (
                  <>
                    <div className="font-medium mb-1">All Weapons Overlay Active</div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: WEAPON_CONFIG.Foil.color }}></span>
                        <span>Foil</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: WEAPON_CONFIG.Epee.color }}></span>
                        <span>Epee</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: WEAPON_CONFIG.Saber.color }}></span>
                        <span>Saber</span>
                      </div>
                    </div>
                    <div className="text-gray-600 text-xs mt-1">Bubble size = rated fencers per weapon</div>
                  </>
                ) : (
                  <>
                    <div className="font-medium">Bubble size = selected metric</div>
                    <div className="text-gray-600">Zoom in/out to adjust bubble scale • Choose a metric above to resize circles.</div>
                  </>
                )}
              </div>
            )}
          </div>
          </MapErrorBoundary>

          {/* Side Panel - Fixed on Left */}
          <div 
            ref={panelRef}
            tabIndex={-1}
            className={`absolute left-0 top-0 h-[70vh] bg-white border-r border-gray-200 transition-all duration-300 ease-out overflow-hidden shadow-xl z-[2000] ${
              isPanelOpen ? 'w-[420px] opacity-100' : 'w-0 opacity-0 pointer-events-none'
            }`}
            style={{ transitionDuration: `${PANEL_CONFIG.ANIMATION_DURATION}ms`, width: isPanelOpen ? `${PANEL_CONFIG.WIDTH}px` : '0' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="panel-title"
          >
            {selectedDivision && (
              <div className={`h-full flex flex-col transition-opacity duration-300 ${isPanelOpen ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 id="panel-title" className={`text-2xl font-bold text-gray-900 mb-2 leading-tight transition-all duration-300 ${isPanelOpen ? 'animate-fade-in' : ''}`} style={{ animationDelay: '50ms' }}>
                        {selectedDivision.name}
                      </h2>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full transition-all duration-300 ${isPanelOpen ? 'animate-fade-in' : ''}`} style={{ animationDelay: '100ms' }}>
                        <span className="text-sm font-medium text-gray-600">Total Members</span>
                        <span className="text-lg font-bold text-gray-900">{selectedDivision.members.toLocaleString()}</span>
                      </div>
                          </div>
                    <button
                      onClick={handleClosePanel}
                      className="flex-shrink-0 ml-4 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-400 hover:text-gray-600 active:scale-95"
                      aria-label="Close panel"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                            </div>
                          </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  <WeaponStatistics division={selectedDivision} />
                </div>
                    </div>
            )}
          </div>
        </div>

        {/* Top 5 List */}
        <Top5List 
          rows={rows} 
          metricKey={metricKey} 
          onDivisionClick={handleMarkerClick}
        />

        <footer className="text-xs text-gray-500 mt-3">
          Centered at US centroid • OSM tiles • Reproducible jitter for regions • Clean Tailwind UI
        </footer>
      </div>
    </div>
  );
}
