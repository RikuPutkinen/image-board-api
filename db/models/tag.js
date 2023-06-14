const { Model } = require('objection');

class Tag extends Model {
  static tableName = 'tag';

  static idColumn = 'tag_id';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['tag_id', 'tag_name'],

      properties: {
        tag_id: { type: 'string' },
        tag_name: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const Image = require('./image');
    
    return {
      images: {
        relation: Model.ManyToManyRelation,
        modelClass: Image,
        join: {
          from: 'tag.tag_id',
          through: {
            from: 'image_tag.tag_id',
            to: 'image_tag.image_id'
          },
          to: 'image.image_id'
        }
      }
    }
  }
}

module.exports = Tag;