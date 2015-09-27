Rails.application.routes.draw do
  
	root "home#index"

	resources :news
	resources :routes
	devise_for :users, controllers: { sessions: "users/sessions", registrations: "users/registrations" }
  
end
