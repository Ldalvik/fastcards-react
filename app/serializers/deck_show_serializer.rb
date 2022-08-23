class DeckShowSerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :category, :difficulty

    has_many :cards do 
        object.cards.order(:updated_at).reverse
    end
end