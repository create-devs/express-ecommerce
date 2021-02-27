const db = require("../config/db.config");
const Category = db.categories;
exports.dbQuery = (query) => {
    if(query.catId){
        return {
			include: [
			{
				model: Category,
				as: "categories", 
				attributes: ["id", "name", "slug"],
                where: { id: query.catId },
				through: {
					attributes: [],
				}
			}],
            limit: query.limit ? parseInt(query.limit) : undefined,
            offset: query.page ? parseInt(query.limit * (query.page - 1)) : undefined
		};
    } else {
        return { 
            include: [
                {
                    model: Category,
                    as: "categories", 
                    attributes: ["id", "name", "slug"],
                    through: {
                        attributes: [],
                    }
                }
            ],
            limit: query.limit ? parseInt(query.limit) : undefined,
            offset: query.page ? parseInt(query.limit * (query.page - 1)) : undefined
        };
    }
}