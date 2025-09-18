import { Header } from '../header';
import { createRef, useEffect, useState } from 'react';
import { useLocation } from "react-router";

const seedData = {
  largeTools: [
    {
      catalog_id: 101,
      name: "Electric Jackhammer",
      description: "Heavy-duty jackhammer for breaking up concrete and asphalt.",
      dailyRate: 85,
    },
    {
      catalog_id: 102,
      name: "Towable Boom Lift",
      description: "Articulating lift with a 40 ft reach, ideal for construction and tree trimming.",
      dailyRate: 220,
    },
    {
      catalog_id: 203,
      name: "Ride-On Trencher",
      description: "Gas-powered trencher designed for digging trenches quickly and efficiently.",
      dailyRate: 180,
    },
    {
      catalog_id: 147,
      name: "Skid Steer Loader",
      description: "Compact loader for landscaping, construction, and material moving.",
      dailyRate: 200,
    },
    {
      catalog_id: 325,
      name: "Mini Excavator",
      description: "6,000 lb excavator for digging and earthmoving in tight spaces.",
      dailyRate: 250,
    },
    {
      catalog_id: 118,
      name: "Plate Compactor",
      description: "Vibratory compactor for soil, gravel, and asphalt compaction.",
      dailyRate: 90,
    },
    {
      catalog_id: 276,
      name: "Towable Air Compressor",
      description: "185 CFM compressor, commonly used to power pneumatic tools.",
      dailyRate: 150,
    },
    {
      catalog_id: 189,
      name: "Concrete Mixer (Towable)",
      description: "9 cu ft towable mixer for large concrete jobs.",
      dailyRate: 100,
    },
    {
      catalog_id: 310,
      name: "Wood Chipper",
      description: "12-inch capacity wood chipper for branches and yard debris.",
      dailyRate: 190,
    },
    {
      catalog_id: 411,
      name: "Scissor Lift",
      description: "Electric scissor lift with a 26 ft platform height.",
      dailyRate: 210,
    },
    {
      catalog_id: 512,
      name: "Walk-Behind Trencher",
      description: "Compact trencher for irrigation and cable lines.",
      dailyRate: 130,
    },
    {
      catalog_id: 278,
      name: "Concrete Saw (Walk-Behind)",
      description: "14-inch blade saw for cutting concrete and asphalt surfaces.",
      dailyRate: 110,
    },
    {
      catalog_id: 333,
      name: "Stump Grinder",
      description: "Hydraulic grinder for removing tree stumps up to 18 inches deep.",
      dailyRate: 175,
    },
    {
      catalog_id: 420,
      name: "Power Trowel",
      description: "36-inch ride-on power trowel for finishing concrete slabs.",
      dailyRate: 160,
    },
    {
      catalog_id: 501,
      name: "Portable Light Tower",
      description: "Towable LED light tower for illuminating job sites at night.",
      dailyRate: 140,
    },
    {
      catalog_id: 612,
      name: "Lawn Aerator (Tow-Behind)",
      description: "Core aerator attachment for tractors or lawn machines.",
      dailyRate: 85,
    },
    {
      catalog_id: 723,
      name: "Tractor with Loader",
      description: "Compact tractor equipped with a front loader bucket.",
      dailyRate: 260,
    },
    {
      catalog_id: 834,
      name: "Pressure Washer (Hot Water, Trailer-Mounted)",
      description: "High PSI washer for industrial cleaning jobs.",
      dailyRate: 200,
    },
    {
      catalog_id: 945,
      name: "Forklift (5,000 lb)",
      description: "Industrial forklift for moving heavy pallets and materials.",
      dailyRate: 230,
    },
    {
      catalog_id: 106,
      name: "Asphalt Roller",
      description: "1.5-ton roller for compacting asphalt and base materials.",
      dailyRate: 275,
    },
    {
      catalog_id: 257,
      name: "Brush Cutter (Tow-Behind)",
      description: "Heavy-duty mower for fields and overgrown lots.",
      dailyRate: 180,
    },
    {
      catalog_id: 368,
      name: "Concrete Pump",
      description: "Towable concrete pump for large pouring jobs.",
      dailyRate: 290,
    },
    {
      catalog_id: 479,
      name: "Dump Trailer",
      description: "Hydraulic dump trailer with 5-ton capacity.",
      dailyRate: 150,
    },
    {
      catalog_id: 590,
      name: "Utility Tractor",
      description: "Mid-size tractor with multiple attachments available.",
      dailyRate: 280,
    },
    {
      catalog_id: 661,
      name: "Boom Truck",
      description: "Truck-mounted crane for lifting and hoisting materials.",
      dailyRate: 350,
    },
  ],
  smallTools: [
    {
      catalog_id: 701,
      name: "Cordless Drill",
      description: "18V lithium-ion drill/driver with variable speed settings.",
      dailyRate: 20,
    },
    {
      catalog_id: 702,
      name: "Angle Grinder",
      description: "4.5-inch grinder for cutting and grinding metal or masonry.",
      dailyRate: 18,
    },
    {
      catalog_id: 703,
      name: "Orbital Sander",
      description: "Random orbital sander for smooth wood finishing.",
      dailyRate: 15,
    },
    {
      catalog_id: 704,
      name: "Heat Gun",
      description: "Variable temperature heat gun for paint stripping and shrink wrapping.",
      dailyRate: 12,
    },
    {
      catalog_id: 705,
      name: "Hammer Drill",
      description: "Corded drill with hammer action for masonry work.",
      dailyRate: 22,
    },
    {
      catalog_id: 706,
      name: "Impact Driver",
      description: "Compact driver for fastening screws and bolts.",
      dailyRate: 20,
    },
    {
      catalog_id: 707,
      name: "Tile Saw",
      description: "7-inch wet tile saw for precision tile cutting.",
      dailyRate: 25,
    },
    {
      catalog_id: 708,
      name: "Shop Vacuum",
      description: "12-gallon wet/dry vacuum for job site cleanup.",
      dailyRate: 18,
    },
    {
      catalog_id: 709,
      name: "Pipe Threader",
      description: "Electric pipe threader for plumbing jobs.",
      dailyRate: 30,
    },
    {
      catalog_id: 710,
      name: "Caulking Gun (Electric)",
      description: "Powered caulking gun for consistent sealant application.",
      dailyRate: 14,
    },
    {
      catalog_id: 711,
      name: "Staple Gun",
      description: "Manual heavy-duty stapler for upholstery and construction.",
      dailyRate: 10,
    },
    {
      catalog_id: 712,
      name: "Jigsaw",
      description: "Variable speed jigsaw for cutting curves in wood and metal.",
      dailyRate: 15,
    },
    {
      catalog_id: 713,
      name: "Reciprocating Saw",
      description: "Cordless saw for demolition and rough cuts.",
      dailyRate: 22,
    },
    {
      catalog_id: 714,
      name: "Lawn Edger",
      description: "Gas-powered edger for clean lawn borders.",
      dailyRate: 18,
    },
    {
      catalog_id: 715,
      name: "Hedge Trimmer",
      description: "22-inch blade hedge trimmer for yard maintenance.",
      dailyRate: 20,
    },
    {
      catalog_id: 716,
      name: "Paint Sprayer",
      description: "Handheld sprayer for smooth paint finishes.",
      dailyRate: 28,
    },
    {
      catalog_id: 717,
      name: "Moisture Meter",
      description: "Digital moisture tester for wood and drywall.",
      dailyRate: 12,
    },
    {
      catalog_id: 718,
      name: "Stud Finder",
      description: "Electronic stud finder for locating wall studs.",
      dailyRate: 8,
    },
    {
      catalog_id: 719,
      name: "Rotary Laser Level",
      description: "Self-leveling rotary laser for layout and grading.",
      dailyRate: 35,
    },
    {
      catalog_id: 720,
      name: "Concrete Vibrator",
      description: "Handheld vibrator for removing air bubbles in wet concrete.",
      dailyRate: 30,
    },
    {
      catalog_id: 721,
      name: "Power Auger (Handheld)",
      description: "Gas-powered auger for digging fence post holes.",
      dailyRate: 25,
    },
    {
      catalog_id: 722,
      name: "Pipe Cutter",
      description: "Manual cutter for copper, aluminum, and PVC pipes.",
      dailyRate: 10,
    },
    {
      catalog_id: 723,
      name: "Extension Cord Reel",
      description: "50 ft heavy-duty cord reel for job sites.",
      dailyRate: 7,
    },
    {
      catalog_id: 724,
      name: "Bolt Cutter",
      description: "36-inch bolt cutter for locks, chain, and rebar.",
      dailyRate: 15,
    },
    {
      catalog_id: 725,
      name: "Laser Distance Meter",
      description: "Compact laser measure with up to 100 ft range.",
      dailyRate: 18,
    },
  ],
};

export default function Catalog() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const arrLength = seedData.largeTools.length;
  const [refs, setRefs] = useState([]);

  useEffect(() => {
    setRefs((refs) => Array(arrLength).fill().map((_, i) => refs[i] || createRef()));
  }, [arrLength]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/inventory");
    
        if (!response.ok) {
          throw new Error (`Response Status: ${response.status}`);
        }
  
        const result = await response.json();
        await setItems(result.items);
      } catch (error) {
        console.log(error.message);
      }
    }
    getItems();
  }, []);

  const toggleAvailability = (idx) => {
    refs[idx].current.className = (refs[idx].current.className === "hidden") ? "" : "hidden";
  }

  const addToCart = (e, idx, item) => {
    e.preventDefault();
    const [inputStart, inputEnd] = refs[idx].current.children[0].getElementsByTagName("input");
    const endDate = new Date (inputEnd.value.slice(0, 4), inputEnd.value.slice(5, 7) - 1, inputEnd.value.slice(8, 10));
    const startDate = new Date (inputStart.value.slice(0, 4), inputStart.value.slice(5, 7) - 1, inputStart.value.slice(8, 10));
    const numOfReservedDays = (endDate - startDate === 0) ? 1 : ((endDate - startDate) / 86400000);
    setCart([...cart, { catalog_id: item.catalog_id, name: item.name, price: Number((item.dailyRate / 100) * numOfReservedDays).toFixed(2), startDate, endDate }]);
  }

  const deleteItem = (item) => {
    setCart(cart.filter(cartItem => {
      return cartItem.catalog_id !== item.catalog_id;
    }));
  }
  
  const displayedItems = seedData.largeTools.map((item, idx) => {
    return (<li className="flex flex-col justify-start items-start m-2 p-3 bg-gray-400/20 rounded-lg" key={idx}>
      <h2 className="font-bold text-lg mb-2">{item.name}</h2>
      <div className="mb-2">{item.description}</div>
      <div className="mb-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:inset-ring-green-500/20">Daily Rate: {Number(item.dailyRate / 100).toFixed(2)}</div>
      <button className="items-center rounded-full bg-yellow-100 px-2 py-1 font-medium" onClick={() => toggleAvailability(idx)}>Check Availability</button>
      <div ref={refs[idx]} className="hidden">
        <form className="flex flex-col">
          <label className="font-bold" htmlFor="reserve-start-ts">
            Start Date:
          </label>
          <input className="bg-white p-1" type="date" id="reserve-start-ts" name="reserve-start-ts" />
          <label className="font-bold" htmlFor="reserve-end-ts">
            End Date:
          </label>
          <input className="bg-white p-1" type="date" id="reserve-end-ts" name="reserve-end-ts" />
          <button type="submit" className="items-center rounded-full bg-yellow-100 px-2 py-1 font-medium" onClick={(e) => addToCart(e, idx, item)}>Add To Cart</button>
        </form>
      </div>
    </li>)
  });
  return (
  <div>
    <Header cart={cart} />
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Catalog Page</h2>
      <div><ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">{displayedItems}</ul></div>
      <div>Reserve Button should cause dropdown to fill out Reserve Date and Time</div>
      <div>Price is daily rate, date and time should calculate total price</div>
      <div>Cart changed to OBJ, for delete function. Cart needs to be set in catalog component.</div>
    </div>
  </div>);
}
