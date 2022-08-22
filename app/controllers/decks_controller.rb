class DecksController < ApplicationController
    def new
        @deck = Deck.new
        render :"fastcards/new"
    end

    def create
      @deck = Deck.create(deck_params)
      if @deck.save
          flash[:msg] = "Deck added successfully"
          # redirect_to "/deck/#{@deck.id}"
          redirect_to "/decks"
      else
          flash.now[:msg] = @deck.errors.full_messages.to_sentence
          render :"fastcards/new"
      end
    end


    def deck_params      
        params.require(:deck).permit(:name, :category, :description, :difficulty)
    end
end
  