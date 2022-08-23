class DeckSerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :category, :difficulty  
end