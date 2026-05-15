const prisma =
  require("../config/prisma");

async function main() {

  await prisma.farmer.createMany({

    data: [

      {
        name: "John Musa",
        phone: "08012345678",
        location: "Kaduna",
        crop: "Maize",
        stage: "Growing",
        farmSize: "2 hectares"
      },

      {
        name: "Amina Bello",
        phone: "08087654321",
        location: "Kano",
        crop: "Rice",
        stage: "Flowering",
        farmSize: "5 hectares"
      },

      {
        name: "Samuel Okafor",
        phone: "08111222333",
        location: "Jos",
        crop: "Tomato",
        stage: "Harvesting",
        farmSize: "1.5 hectares"
      }
    ]
  });

  console.log(
    "Database seeded successfully."
  );
}

main()
  .catch(console.error)
  .finally(async () => {

    await prisma.$disconnect();
  });