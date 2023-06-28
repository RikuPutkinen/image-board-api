const { Model } = require('objection');

class ImageTag extends Model {
  static tableName = 'image_tag';

  static idColumn = ['image_id', 'tag_id'];

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['image_id', 'tag_id'],

      properties: {
        image_id: { type: 'string' },
        tag_id: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const Image = require('./image');
    const Tag = require('./tag');

    return {
      tags: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tag,
        join: {
          from: 'image_tag.tag_id',
          to: 'tag.tag_id'
        }
      },
      images: {
        relation: Model.BelongsToOneRelation,
        modelClass: Image,
        join: {
          from: 'image_tag.image_id',
          to: 'image.image_id'
        }
      }
    }
  }
}

module.exports = ImageTag;