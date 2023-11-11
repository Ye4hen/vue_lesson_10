import { createStore } from "vuex";
import contacts from "../data/contactsData.json";

export default createStore({
	state: {
		contactsList: [],
		errorMessage: null,
		filterText: null,
		mode: null,
	},
	getters: {
		contactsList: ({ contactsList }) => contactsList,
		errorMessage: ({ errorMessage }) => errorMessage,
		mode: ({ mode }) => mode,
		contactAvatar: () => (contact) => {
			if (contact.first_name && contact.last_name) {
				return contact.first_name[0] + contact.last_name[0];
			} else if (!contact.first_name && contact.last_name) {
				return contact.last_name.slice(0, 2);
			} else if (!contact.last_name && contact.first_name) {
				return contact.first_name.slice(0, 2);
			} else if (contact.emails && contact.emails.length > 0) {
				return contact.emails[0].slice(0, 2);
			}
			return `NA`;
		},
		fullName: () => (contact) => {
			return contact.first_name || contact.last_name
		},
		getRandomColor: () => () => {
			const red = Math.floor(Math.random() * 256);
			const green = Math.floor(Math.random() * 256);
			const blue = Math.floor(Math.random() * 256);
			return `rgb(${red}, ${green}, ${blue})`;
		},
		isValidEmail: () => (email) => {
			const emailVerification = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailVerification.test(email);
		},
		filteredList: (state) => {
			if (!state.filterText) {
				state.errorMessage = null;
				return state.contactsList;
			} else {
				const searchParam = state.filterText.toLowerCase();
				const filteredContacts = state.contactsList.filter((contact) => {
					return (
						(contact.first_name &&
							contact.first_name.toLowerCase().includes(searchParam)) ||
						(contact.last_name &&
							contact.last_name.toLowerCase().includes(searchParam)) ||
						(contact.emails &&
							contact.emails.some(
								(email) => email && email.toLowerCase().includes(searchParam)
							)) ||
						(contact.first_name + " " + contact.last_name)
							.toLowerCase()
							.includes(searchParam) ||
						(contact.activity_score &&
							contact.activity_score.toString().includes(searchParam))
					);
				});
				state.errorMessage = filteredContacts.length ? null : "Немає таких контактів";
				return filteredContacts;
			}
		},
		getContactById: (state) => (contactId) => {
			const contact = state.contactsList.find((contact) => contact.id == contactId);
			return contact ? { ...contact, emails: contact.emails || [] } : {};
		},
	},
	mutations: {
		setContactsList(state, list) {
			state.contactsList = list;
		},
		addNewContact(state, newContactData) {
			const newContact = {
				id: new Date().getTime(),
				activity_score: new Date().getTime(),
				emails: [newContactData.emails],
				first_name: newContactData.first_name,
				last_name: newContactData.last_name,
			}
			state.contactsList.push(newContact)
		},
		setErrorMessage(state, message) {
			state.errorMessage = message
		},
		setFilterText(state, text) {
			state.filterText = text;
		},
		setMode(state, mode) {
			state.mode = mode;
		},
		changeContactInfo(state, contactData) {
			const contactIndex = state.contactsList.findIndex((contact) => contact.id == contactData.id)
			state.contactsList[contactIndex] = { ...contactData }
		}
	},
	actions: {
		getContactsList({ commit }) {
			commit("setContactsList", contacts)
		},
		addNewContact({ commit }, newContactData) {
			commit("addNewContact", newContactData)
		},
		setModeToAdd({ commit }) {
			commit('setMode', 'add')
			console.log('add');
		},
		setErrorMessage({ commit }, message) {
			commit("setErrorMessage", message)
		},
		updateFilterText({ commit }, text) {
			commit("setFilterText", text)
		},
		editContact({ commit }, contactId) {
			commit('setMode', 'edit', contactId);
			console.log(contactId);
		},
		changeContactInfo({ commit }, contactData) {
			commit("changeContactInfo", contactData)
		}
	},
});
