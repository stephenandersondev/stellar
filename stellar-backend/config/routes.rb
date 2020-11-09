Rails.application.routes.draw do
  resources :resources, only: [:index]
  resources :users
  resources :messages
  resources :projects
  
  get '/resources/apod', to: 'resources#apod'
  post '/resources/search', to: 'resources#search'
  post '/auth', to: 'auth#create'
end
