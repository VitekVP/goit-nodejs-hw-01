// const contactsService = require("./contacts");
// const { program } = require("commander");

import contactsService from "./contacts.js";
import { program } from "commander";

program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case "list":
			const allContacts = await contactsService.listContacts();
			console.table(allContacts);
			break;
		case "get":
			const contactByid = await contactsService.getContactById(id);
			console.table(contactByid);
			break;
		case "remove":
			const removedContactById = await contactsService.removeContact(id);
			console.table(removedContactById);
			break;
		case "add":
			const newContact = await contactsService.addContact({ name, email, phone });
			console.table(newContact);
			break;
		case "update":
			const updateContactById = await contactsService.updateContactById(id, { name, email, phone });
			console.table(updateContactById);
			break;
		default:
			console.warn("\x1B[31m Unknown action type!");
	}
};

invokeAction(argv);
