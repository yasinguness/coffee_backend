const BaseService = require("./base.service");
const BaseModel = require("../models/Product");

class ProductService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  async updateStock(productId, quantity) {
    try {
      // Ürünü veritabanından al
      const product = await BaseModel.findById(productId);
    
      if (!product) {
        throw new Error("Ürün bulunamadı");
      }
    
      // Stok miktarını güncelle
      product.stock -= quantity;
    
      // Güncellenmiş ürünü kaydet
      await product.save();
    
      // Güncellenmiş ürünü dön
      return product;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductService();
