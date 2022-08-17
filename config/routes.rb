Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  resources :decks, only: [:new, :create]

  namespace :api do
    namespace :v1 do
      resources :decks, only: [:index, :show]
    end
  end

  get "/decks",     to: "homes#index"
  get "/decks/:id", to: "homes#index"
end