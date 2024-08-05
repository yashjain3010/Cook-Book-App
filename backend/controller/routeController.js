const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

//getAllRecipes

const getAllRecipes = async (req,res) => {
    const recipes = await prisma.recipe.findMany();
    res.json(recipes)
};

//createRecipe

const createRecipe = async (req,res) => {
    const {name,instructions,thumbnail} = req.body;

    const recipe = await prisma.recipe.create({
        data:{
            name,
            instructions,
            thumbnail,
            postedBy: {
                connect: {id: req.user.userid}
            },
            postedAt,
        }
    })
    res.status(201).json(recipe);
}

//deleteRecipe

const deleteRecipe = async (req,res) => {
    const {id} = req.params;

    const recipe = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        },
    })

    if(recipe.userid !== req.user.userid){
        return res.status(403).json({
            error : "Not authorized to delete this recipe"
        })
    }

    await prisma.recipe.delete({
        where: {
            id: parseInt(id)
        }
    })

    res.json({message: 'Recipe created Successfully'})
}

//markAsFavourite

const markAsFavourite = async (req,res) => {
    const {id} = req.params;

    await prisma.user.update({
        where: {id: req.user.userid},
        data: {
            favourites: {
                connect: {
                    id: parseInt(id),
                }
            }
        }
    })

    res.json({message: "Recipe marked as favourite"})
}

//removeFromFavourite

const removeFromFavourite = async (req,res) => {
    const {id} = req.params;

    await prisma.user.update({
        where: {id: req.user.userid},
        data: {
            favourites: {
                disconnect: {id: parseInt(id)}
            }
        }
    })
    res.json({
        message: "Recipe unmarked from favourite"
    })
}

//getFavourites

const getFavourites = async (req,res) => {
    const user = await prisma.user.findUnique({
        where: {id: req.user.userid},
        include: {
            favourites: true
        }
    })

    res.json(user.favourites);
}

module.exports = {
    getAllRecipes,
    createRecipe,
    deleteRecipe,
    markAsFavourite,
    removeFromFavourite,
    getFavourites
}