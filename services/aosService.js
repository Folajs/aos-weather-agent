const prisma =
  require("../config/prisma");


// GET ALL FARMERS
async function getFarmers() {

  return prisma.farmer.findMany({
    orderBy: {
      id: "asc"
    }
  });
}


// GET ONE FARMER
async function getFarmerById(id) {

  return prisma.farmer.findUnique({
    where: {
      id: Number(id)
    }
  });
}


// CREATE FARMER
async function createFarmer(data) {

  return prisma.farmer.create({
    data
  });
}


module.exports = {
  getFarmers,
  getFarmerById,
  createFarmer
};
// const mockFarmers = [

//   {
//     id: 1,
//     name: "John Musa",
//     phone: "08012345678",
//     location: "Kaduna",
//     crop: "Maize",
//     stage: "Growing",
//     farmSize: "2 hectares"
//   },

//   {
//     id: 2,
//     name: "Amina Bello",
//     phone: "08087654321",
//     location: "Kano",
//     crop: "Rice",
//     stage: "Flowering",
//     farmSize: "5 hectares"
//   },

//   {
//     id: 3,
//     name: "Samuel Okafor",
//     phone: "08111222333",
//     location: "Jos",
//     crop: "Tomato",
//     stage: "Harvesting",
//     farmSize: "1.5 hectares"
//   }
// ];

// // GET ALL FARMERS
// async function getFarmers() {

//   return mockFarmers;
// }

// // GET ONE FARMER
// async function getFarmerById(id) {

//   return mockFarmers.find(
//     farmer => farmer.id == id
//   );
// }

// module.exports = {
//   getFarmers,
//   getFarmerById
// };