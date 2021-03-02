const db = require("../config/db.config");
const { Op } = require("sequelize");
const Category = db.categories;

exports.dbQuery = (query) => {
    if(query.catId){
        return {
            model: Category,
            as: "categories", 
            attributes: ["id", "name", "slug"],
            where: {
                [Op.or]: [
                    { id: query.catId },
                    { categoryId: query.catId }
                ]
            },
            through: {
                attributes: [],
            }
		};
    } else {
        return {
            model: Category,
            as: "categories", 
            attributes: ["id", "name", "slug"],
            through: {
                attributes: [],
            }
        }
    }
}