const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    res.status(200).json({
        status: "OK",
        data: allUsers
    })
})

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const getByIdUser = await prisma.user.findMany({
        where: {
            id: id
        }
    });

    res.status(200).json({
        status: "OK",
        data: getByIdUser
    })
})

app.post("/", async (req, res) => {
    const newUser = await prisma.user.create({
        data: req.body
    })
    res.status(201).json({
        status: "CREATED",
        data: newUser
    })
})

app.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const editUser = await prisma.user.update({
        where: { id: id },
        data: req.body
    })

    res.status(200).json({
        status: "UPDATED",
        data: editUser
    })
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await prisma.user.delete({
        where: {
            id: id
        }
    })

    res.status(200).json({
        status: "DELETED",
        data: `Deleted User id: ${id}`
    });
})

app.post('/house', async (req, res) => {
    const newHouse = await prisma.house.create({ data: req.body });
    res.status(201).json({
        status: "CREATED",
        data: newHouse
    })
})

app.get("/house", async (req, res) => {

    const allHouses = await prisma.house.findMany({
        // returns the owner and builtBy user objects
        include: {
          owner: true,
          builtBy: true,
        },
      });

    res.status(200).json({
        status: "OK",
        data: allHouses
    })
})

app.get("/house/:id", async (req, res) => {
    const { id } = req.params;
    const getHouse = await prisma.house.findUnique(
      {
        where: { id },
      },
      {
        // returns the owner and builtBy user objects
        include: {
          owner: true,
          builtBy: true,
        },
      }  
    );

    res.status(200).json({
        status: "OK",
        data: getHouse
    })
})

app.listen(4000, () => {
    console.log('Server listener 4000 port')
})