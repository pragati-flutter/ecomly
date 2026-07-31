const cron = require("node-corn");

const Category = require("../../models/category");
const Product = require("../../models/product");

cron.schedule("04 14 * * *", async function () {
  try {
    const categoryToBeDeleted = await Category.find({ markForDeletion: true });
    for (const category of categoryToBeDeleted) {
      const categoryProductCount = await Product.countDocuments({
        category: category.id,
      });

      if (categoryProductCount < 1) { 
        await category.deleteOne();
      }
    }
    console.log("CRON job completed at", newDate());
  } catch (error) {
    console.error(`Cron job error`, error);
  }
});
