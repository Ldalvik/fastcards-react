class CardSerializer < ActiveModel::Serializer
    attributes :id, :question, :answer, :clue, :difficulty
end