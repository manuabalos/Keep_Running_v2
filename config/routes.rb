Rails.application.routes.draw do
  
	#devise_for :users, controllers: { sessions: "users/sessions", registrations: "users/registrations" }
	devise_for :users
	root "home#index"

	
  
end
