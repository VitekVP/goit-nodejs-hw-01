// const fs = require("fs").promises;
// const path = require("path");
// const { nanoid } = require("nanoid");

import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const listContacts = async () => {
	const allContacts = await fs.readFile(contactsPath);
	return JSON.parse(allContacts);
};

const getContactById = async contactId => {
	const contacts = await listContacts();
	const contact = contacts.find(el => el.id === contactId);
	console.log(typeof contactId);
	return contact || null;
};

const removeContact = async contactId => {
	const contacts = await listContacts();
	const index = contacts.findIndex(el => el.id === contactId);
	if (index === -1) {
		return null;
	}
	const [removedContact] = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return removedContact;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
};

const updateContactById = async (contactId, { name, email, phone }) => {
	const contacts = await listContacts();
	const index = contacts.findIndex(el => el.id === contactId);
	if (index === -1) {
		return null;
	}
	contacts[index] = { id: contactId, name, email, phone };
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contacts[index];
};

// module.exports = {
// 	listContacts,
// 	getContactById,
// 	removeContact,
// 	addContact,
// };

export default {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContactById,
};
