import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('7dfdd779-062f-4ad8-b3f0-43c242cfb3ab', '1Cristian.Gislason@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv12345token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('a4fbf8a4-b4a6-42fb-b8be-9875d70a5264', '9Lue_Dickens@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=11', 'inv09876token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('34e889fb-be8e-4fea-9966-3dde5ac31f26', '17Myrl25@yahoo.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=19', 'inv54321token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('c04eae52-145e-4147-a5f7-e085d7c3e44a', '25Ashlynn_Fadel@gmail.com', 'Emily Williams', 'https://i.imgur.com/YfJQV5z.png?id=27', 'inv09876token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('cebfc049-ce6e-4098-a10e-1fccbe860653', '33Nelda92@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv09876token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('91f58895-6564-41ac-ac6a-fcfd09526c6d', '41Bertram_Rodriguez64@yahoo.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv09876token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('43a1f213-588b-4d49-bd5e-f4263309b86f', '49Ashly_Davis96@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv54321token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('b150c7af-a1eb-4d50-b2bc-d87af7583407', '57Kathlyn.OHara-Brekke53@gmail.com', 'Emily Williams', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv54321token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('74ab697c-ba66-4d9c-a5d7-2976919bebfe', '73Doyle72@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv11223token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('f4b0d040-e97a-41d6-aa86-b7cc2a4306ed', 'Blue Horizon Estates', 'https://i.imgur.com/YfJQV5z.png?id=82');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('dea4e916-b92e-45ce-baca-b2f8368a5988', 'Prime Land Holdings', 'https://i.imgur.com/YfJQV5z.png?id=85');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('7626c5ce-a51c-4b13-bfad-bac00e892fc2', 'Prime Land Holdings', 'https://i.imgur.com/YfJQV5z.png?id=88');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('0b2b08df-c2da-4e12-87de-ba3f2450eb15', 'Blue Horizon Estates', 'https://i.imgur.com/YfJQV5z.png?id=91');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('fc57e921-4e6c-45e3-b5cf-3b5ff789e051', 'Prime Land Holdings', 'https://i.imgur.com/YfJQV5z.png?id=94');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('37dc17a4-7d06-45b8-9d63-fefbef365458', 'Sunrise Realty Group', 'https://i.imgur.com/YfJQV5z.png?id=97');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('1f964310-3730-4073-a644-38b6725e52e2', 'Green Valley Realty', 'https://i.imgur.com/YfJQV5z.png?id=100');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('7ca607a2-ce73-461e-97fd-09872e736404', 'Prime Land Holdings', 'https://i.imgur.com/YfJQV5z.png?id=103');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('7f884f98-192a-4221-a16a-b2f0937fc1e7', 'Green Valley Realty', 'https://i.imgur.com/YfJQV5z.png?id=106');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('87206efc-4a05-4444-8719-83ab1fcf8b12', 'Green Valley Realty', 'https://i.imgur.com/YfJQV5z.png?id=109');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('b1a6554f-65c9-48bf-84d6-9a50ded8c3ab', 'Broker Associate', 'b150c7af-a1eb-4d50-b2bc-d87af7583407', '7f884f98-192a-4221-a16a-b2f0937fc1e7');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('b5099ea5-0ce2-4c64-adb1-cfb85c1b0078', 'Broker Associate', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '87206efc-4a05-4444-8719-83ab1fcf8b12');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('26fb9940-2b3e-49e8-a97c-f9b0ca50fb3d', 'Property Manager', 'b150c7af-a1eb-4d50-b2bc-d87af7583407', 'fc57e921-4e6c-45e3-b5cf-3b5ff789e051');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('64c65ae2-e1cd-4ed4-9094-ad29f1475109', 'Leasing Consultant', 'a4fbf8a4-b4a6-42fb-b8be-9875d70a5264', '1f964310-3730-4073-a644-38b6725e52e2');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('38b8a18a-1380-4462-acc1-36f26f32d7f3', 'Real Estate Agent', 'a4fbf8a4-b4a6-42fb-b8be-9875d70a5264', '7626c5ce-a51c-4b13-bfad-bac00e892fc2');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('a6873adb-1b7a-424d-8877-7d8d12b39a28', 'Real Estate Agent', '34e889fb-be8e-4fea-9966-3dde5ac31f26', '1f964310-3730-4073-a644-38b6725e52e2');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('81f2439f-7df1-4a62-ad5b-94b802a12d67', 'Transaction Coordinator', '43a1f213-588b-4d49-bd5e-f4263309b86f', '7f884f98-192a-4221-a16a-b2f0937fc1e7');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('cdc66acc-8092-4670-836f-a4aed4bfac26', 'Transaction Coordinator', 'a4fbf8a4-b4a6-42fb-b8be-9875d70a5264', '1f964310-3730-4073-a644-38b6725e52e2');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('6aa31ce0-16ed-4fe1-9c63-6165506f7fb7', 'Real Estate Agent', 'cebfc049-ce6e-4098-a10e-1fccbe860653', 'f4b0d040-e97a-41d6-aa86-b7cc2a4306ed');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('19aedcf2-6b81-4866-aa26-b6ad71ea6fce', 'Transaction Coordinator', 'cebfc049-ce6e-4098-a10e-1fccbe860653', 'f4b0d040-e97a-41d6-aa86-b7cc2a4306ed');

INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('34ec1d41-a084-406a-bd8f-3b2e99a1e68e', 'aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vc3Vic2NyaXB0aW9uL3ZhbGlkYXRpb24', '74ab697c-ba66-4d9c-a5d7-2976919bebfe');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('18db21bf-6e05-4b34-96a3-9ac021f95a33', 'aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vc3Vic2NyaXB0aW9uL3ZhbGlkYXRpb24', 'b150c7af-a1eb-4d50-b2bc-d87af7583407');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('4c2a198d-4118-47d5-af82-33f86e903d29', 'aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vc3Vic2NyaXB0aW9uL3ZhbGlkYXRpb24', 'a4fbf8a4-b4a6-42fb-b8be-9875d70a5264');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('8f9d824f-c7d9-4234-9a51-450d1ddad368', 'c3Vic2NyaXB0aW9uX2lkPTQ1Njc4OTAxMjM0JmV4cGlyeT0yMDI0LTA2LTAx', 'b150c7af-a1eb-4d50-b2bc-d87af7583407');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('749950ab-f146-4e10-a47d-138c9ddba2de', 'aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vc3Vic2NyaXB0aW9uL3ZhbGlkYXRpb24', 'c04eae52-145e-4147-a5f7-e085d7c3e44a');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('de433cd5-16be-4d2a-a581-f1c87fecd71a', 'c29tZXJhbmRvbXN0cmluZ3dpdGhzb21lY2hhcmFjdGVycw', '34e889fb-be8e-4fea-9966-3dde5ac31f26');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('3b98c03d-038b-4822-9bea-7e952518701a', 'dXNlcl9pZD0xMjM0NTY3ODkwJm5vdGlmaWNhdGlvbl90eXBlPWVtYWls', '74ab697c-ba66-4d9c-a5d7-2976919bebfe');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('29baa742-ead2-4875-bf41-799247816cc6', 'dXNlcl9pZD0xMjM0NTY3ODkwJm5vdGlmaWNhdGlvbl90eXBlPWVtYWls', 'b150c7af-a1eb-4d50-b2bc-d87af7583407');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('b5436183-9c1c-4f18-8b68-f346aebc0c08', 'c3Vic2NyaXB0aW9uX2lkPTQ1Njc4OTAxMjM0JmV4cGlyeT0yMDI0LTA2LTAx', 'a4fbf8a4-b4a6-42fb-b8be-9875d70a5264');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('75503588-0b10-4577-aba3-4616e485e175', 'dXNlcl9pZD0xMjM0NTY3ODkwJm5vdGlmaWNhdGlvbl90eXBlPWVtYWls', '7dfdd779-062f-4ad8-b3f0-43c242cfb3ab');

INSERT INTO "Property" ("id", "address", "price", "type", "status", "mlsId", "specifications", "description", "organizationId") VALUES ('887b8161-f169-4cc2-80f4-a35133704f6b', '151 443 E 6th St, New York, NY 10009', '350000', 'Single Family Home', 'Under Contract', 'MLS123456', '{"taedium":"tergo","adsuesco":"laudantium","coniecto":"cuius","patrocinor":"terra"}'::jsonb, 'Modern condo in the heart of downtown.', '0b2b08df-c2da-4e12-87de-ba3f2450eb15');
INSERT INTO "Property" ("id", "address", "price", "type", "status", "mlsId", "specifications", "description", "organizationId") VALUES ('42ae67fc-6a3e-4b18-8894-2219cbcf84b8', '159 136 E 13th St, New York, NY 10003', '1200000', 'Apartment', 'Under Contract', 'MLS123456', '{"vulnus":"consequuntur","tot":"thesaurus","cogito":"adinventitias"}'::jsonb, 'Charming townhouse with updated kitchen and bath.', '87206efc-4a05-4444-8719-83ab1fcf8b12');
INSERT INTO "Property" ("id", "address", "price", "type", "status", "mlsId", "specifications", "description", "organizationId") VALUES ('e53c7bdf-a91c-4797-8f9e-457ab4996ce8', '167 330 W Broadway, New York, NY 10013', '350000', 'Condo', 'Sold', 'MLS123456', '{"creptio":"crur","comminor":"placeat","vox":"nulla"}'::jsonb, 'Spacious duplex with great rental potential.', 'f4b0d040-e97a-41d6-aa86-b7cc2a4306ed');
INSERT INTO "Property" ("id", "address", "price", "type", "status", "mlsId", "specifications", "description", "organizationId") VALUES ('d8bf958b-50da-4460-b1b7-1609cd881c9e', '175 18 Spring St, New York, NY 10012', '250000', 'Condo', 'Under Contract', 'MLS123456', '{"culpa":"ustilo","nemo":"custodia","incidunt":"aliquid","ascisco":"ambulo"}'::jsonb, 'Modern condo in the heart of downtown.', '7ca607a2-ce73-461e-97fd-09872e736404');
INSERT INTO "Property" ("id", "address", "price", "type", "status", "mlsId", "specifications", "description", "organizationId") VALUES ('a22fb03e-82f9-4cf7-a278-c92e2d037edd', '183 136 E 13th St, New York, NY 10003', '599000', 'Apartment', 'Under Contract', 'MLS123456', '{"thymbra":"verumtamen","laboriosam":"arbustum","ara":"iusto","avarus":"combibo"}'::jsonb, 'Charming townhouse with updated kitchen and bath.', '87206efc-4a05-4444-8719-83ab1fcf8b12');
INSERT INTO "Property" ("id", "address", "price", "type", "status", "mlsId", "specifications", "description", "organizationId") VALUES ('2721f9a3-0a30-435d-a824-9a1d8d955da3', '191 443 E 6th St, New York, NY 10009', '475000', 'Single Family Home', 'Off Market', 'MLS456789', '{"sapiente":"apparatus","amissio":"beatus","minus":"depono","adinventitias":"acer"}'::jsonb, 'Charming townhouse with updated kitchen and bath.', '7ca607a2-ce73-461e-97fd-09872e736404');
INSERT INTO "Property" ("id", "address", "price", "type", "status", "mlsId", "specifications", "description", "organizationId") VALUES ('b0c2017c-e450-45c1-b4a3-fff0983a0ec1', '199 330 W Broadway, New York, NY 10013', '250000', 'Townhouse', 'Under Contract', 'MLS456789', '{"tactus":"caterva","celo":"distinctio","veritas":"comparo","hic":"vester"}'::jsonb, 'Modern condo in the heart of downtown.', '7f884f98-192a-4221-a16a-b2f0937fc1e7');
INSERT INTO "Property" ("id", "address", "price", "type", "status", "mlsId", "specifications", "description", "organizationId") VALUES ('493ae7fa-9249-42ef-8e52-63434cdd834a', '207 330 W Broadway, New York, NY 10013', '599000', 'Duplex', 'Pending', 'MLS567890', '{"cernuus":"voluptate","viridis":"nulla","allatus":"aliquam","terra":"vulticulus","contego":"stabilis"}'::jsonb, 'Beautiful 3bedroom home with a spacious backyard.', '1f964310-3730-4073-a644-38b6725e52e2');
INSERT INTO "Property" ("id", "address", "price", "type", "status", "mlsId", "specifications", "description", "organizationId") VALUES ('5cb6bea0-7481-456a-a466-7dbc6aef4cae', '215 18 W 29th St, New York, NY 10001', '1200000', 'Townhouse', 'Sold', 'MLS345678', '{"temeritas":"tonsor","ultra":"ter","tempus":"cinis"}'::jsonb, 'Modern condo in the heart of downtown.', '37dc17a4-7d06-45b8-9d63-fefbef365458');
INSERT INTO "Property" ("id", "address", "price", "type", "status", "mlsId", "specifications", "description", "organizationId") VALUES ('4c2708f4-dfc1-44d4-90ae-35e51be2b236', '223 430 Lafayette St, New York, NY 10003', '350000', 'Single Family Home', 'For Sale', 'MLS456789', '{"consuasor":"deputo","careo":"accusamus","vis":"error","tener":"conspergo","videlicet":"tantum"}'::jsonb, 'Charming townhouse with updated kitchen and bath.', 'f4b0d040-e97a-41d6-aa86-b7cc2a4306ed');

INSERT INTO "Client" ("id", "name", "email", "phone", "type", "preferences", "preApprovalStatus", "organizationId") VALUES ('0e140a1d-dd93-4cea-a88b-b973f2e41970', 'Jane Smith', '232Destin87@hotmail.com', '5556789', 'Renter', '{"inflammatio":"aeternus","deprimo":"corpus","vorago":"suggero","et":"arceo","cur":"addo"}'::jsonb, 'Approved', '37dc17a4-7d06-45b8-9d63-fefbef365458');
INSERT INTO "Client" ("id", "name", "email", "phone", "type", "preferences", "preApprovalStatus", "organizationId") VALUES ('47ce2a0d-201a-432d-b67d-2bbac941c027', 'David Brown', '239Annabell53@gmail.com', '5555678', 'Buyer', '{"vivo":"audeo","corpus":"corona","volup":"curatio","alias":"statim","calamitas":"quasi"}'::jsonb, 'Approved', 'dea4e916-b92e-45ce-baca-b2f8368a5988');
INSERT INTO "Client" ("id", "name", "email", "phone", "type", "preferences", "preApprovalStatus", "organizationId") VALUES ('e2fdb863-496d-448a-8f50-5903b7d1d14f', 'Emily Davis', '246Ava69@gmail.com', '5556789', 'Seller', '{"cunabula":"summa","cornu":"terebro","verto":"temptatio","theologus":"super"}'::jsonb, 'Denied', '0b2b08df-c2da-4e12-87de-ba3f2450eb15');
INSERT INTO "Client" ("id", "name", "email", "phone", "type", "preferences", "preApprovalStatus", "organizationId") VALUES ('ba690e39-0586-4a18-aa52-78aa204651f7', 'Jane Smith', '253Mia_Quitzon@gmail.com', '5554321', 'Renter', '{"solvo":"cito","clamo":"cornu","labore":"ut"}'::jsonb, 'Pending', 'f4b0d040-e97a-41d6-aa86-b7cc2a4306ed');
INSERT INTO "Client" ("id", "name", "email", "phone", "type", "preferences", "preApprovalStatus", "organizationId") VALUES ('fd32381e-a828-4804-aacc-4c494efc7f31', 'David Brown', '260Delia_Russel@hotmail.com', '5556789', 'Investor', '{"demulceo":"varius","comitatus":"unus","dolores":"defetiscor"}'::jsonb, 'Denied', '7f884f98-192a-4221-a16a-b2f0937fc1e7');
INSERT INTO "Client" ("id", "name", "email", "phone", "type", "preferences", "preApprovalStatus", "organizationId") VALUES ('50065a7a-073c-457a-9f82-b0c7a75b14ce', 'Jane Smith', '267Braeden_Schaefer@gmail.com', '5555678', 'Buyer', '{"vix":"vel","ademptio":"consequuntur","ipsa":"thorax"}'::jsonb, 'Approved', '87206efc-4a05-4444-8719-83ab1fcf8b12');
INSERT INTO "Client" ("id", "name", "email", "phone", "type", "preferences", "preApprovalStatus", "organizationId") VALUES ('07370096-6377-4d41-8500-db6aec57738a', 'Michael Johnson', '274Dillan7@hotmail.com', '5558765', 'Agent', '{"xiphias":"colo","sordeo":"caries","patria":"uterque","talio":"dapifer"}'::jsonb, 'Pending', '7ca607a2-ce73-461e-97fd-09872e736404');
INSERT INTO "Client" ("id", "name", "email", "phone", "type", "preferences", "preApprovalStatus", "organizationId") VALUES ('d5c0e696-b229-4a6a-8882-ec0f1c83093d', 'Michael Johnson', '281Willy27@hotmail.com', '5551234', 'Buyer', '{"utroque":"vulgaris","pariatur":"mollitia","volaticus":"asper","depopulo":"in"}'::jsonb, 'In Review', '7626c5ce-a51c-4b13-bfad-bac00e892fc2');
INSERT INTO "Client" ("id", "name", "email", "phone", "type", "preferences", "preApprovalStatus", "organizationId") VALUES ('f86c88a8-884c-4b8b-90d1-1a7a1c6e26e1', 'David Brown', '288Jairo.Quigley77@gmail.com', '5558765', 'Investor', '{"vivo":"cito","arca":"exercitationem","depereo":"occaecati"}'::jsonb, 'Not Applicable', '7626c5ce-a51c-4b13-bfad-bac00e892fc2');
INSERT INTO "Client" ("id", "name", "email", "phone", "type", "preferences", "preApprovalStatus", "organizationId") VALUES ('108e58da-ba60-420c-9902-f4dbc4626a07', 'Emily Davis', '295Amira_Smitham79@yahoo.com', '5554321', 'Agent', '{"acervus":"vado","clementia":"decor","accommodo":"torrens","anser":"absum"}'::jsonb, 'Denied', '1f964310-3730-4073-a644-38b6725e52e2');

INSERT INTO "Transaction" ("id", "status", "type", "price", "closingDate", "organizationId", "propertyId") VALUES ('35fe192d-3578-4002-bfb2-c066c990560c', 'In Progress', 'Exchange', '750000', '2024-08-09T03:42:12.972Z', 'fc57e921-4e6c-45e3-b5cf-3b5ff789e051', '2721f9a3-0a30-435d-a824-9a1d8d955da3');
INSERT INTO "Transaction" ("id", "status", "type", "price", "closingDate", "organizationId", "propertyId") VALUES ('662ebeaf-2a6b-411b-a65a-dcefa8f0c076', 'In Progress', 'Sale', '1500000', '2024-02-22T09:19:18.291Z', 'dea4e916-b92e-45ce-baca-b2f8368a5988', '493ae7fa-9249-42ef-8e52-63434cdd834a');
INSERT INTO "Transaction" ("id", "status", "type", "price", "closingDate", "organizationId", "propertyId") VALUES ('faf1874c-64fe-4e0a-bbc8-120dd9e0c460', 'In Progress', 'Lease', '1500000', '2025-08-06T09:02:13.110Z', '87206efc-4a05-4444-8719-83ab1fcf8b12', '493ae7fa-9249-42ef-8e52-63434cdd834a');
INSERT INTO "Transaction" ("id", "status", "type", "price", "closingDate", "organizationId", "propertyId") VALUES ('2b3b6d7c-7b94-4205-8e73-ebf83ed877c6', 'In Progress', 'Purchase', '300000', '2023-12-30T18:30:31.247Z', '7ca607a2-ce73-461e-97fd-09872e736404', 'b0c2017c-e450-45c1-b4a3-fff0983a0ec1');
INSERT INTO "Transaction" ("id", "status", "type", "price", "closingDate", "organizationId", "propertyId") VALUES ('1cb8044c-936c-4784-92c2-42da06cc382e', 'Under Review', 'Purchase', '750000', '2024-08-01T12:04:44.581Z', '7f884f98-192a-4221-a16a-b2f0937fc1e7', '493ae7fa-9249-42ef-8e52-63434cdd834a');
INSERT INTO "Transaction" ("id", "status", "type", "price", "closingDate", "organizationId", "propertyId") VALUES ('eff0a453-770f-4fc0-9454-e0b3350648ca', 'Pending', 'Rental', '750000', '2024-04-01T15:51:11.816Z', '7f884f98-192a-4221-a16a-b2f0937fc1e7', '2721f9a3-0a30-435d-a824-9a1d8d955da3');
INSERT INTO "Transaction" ("id", "status", "type", "price", "closingDate", "organizationId", "propertyId") VALUES ('a01bd4bd-bafe-499b-898e-aebf64b6fecc', 'In Progress', 'Sale', '250000', '2024-05-10T03:43:32.724Z', '7f884f98-192a-4221-a16a-b2f0937fc1e7', 'a22fb03e-82f9-4cf7-a278-c92e2d037edd');
INSERT INTO "Transaction" ("id", "status", "type", "price", "closingDate", "organizationId", "propertyId") VALUES ('addfea64-e459-4809-a3c9-c45c72fbc522', 'Completed', 'Purchase', '1500000', '2024-08-03T07:51:06.055Z', '1f964310-3730-4073-a644-38b6725e52e2', 'a22fb03e-82f9-4cf7-a278-c92e2d037edd');
INSERT INTO "Transaction" ("id", "status", "type", "price", "closingDate", "organizationId", "propertyId") VALUES ('c36e759d-220b-4799-95f2-6a8680dc5e11', 'Pending', 'Exchange', '300000', '2025-02-10T06:08:08.885Z', '7626c5ce-a51c-4b13-bfad-bac00e892fc2', 'a22fb03e-82f9-4cf7-a278-c92e2d037edd');
INSERT INTO "Transaction" ("id", "status", "type", "price", "closingDate", "organizationId", "propertyId") VALUES ('f422dd45-67bc-4422-84e7-b3cc87d15232', 'Under Review', 'Exchange', '950000', '2024-02-10T07:00:14.913Z', '7f884f98-192a-4221-a16a-b2f0937fc1e7', 'e53c7bdf-a91c-4797-8f9e-457ab4996ce8');

INSERT INTO "TransactionParticipant" ("id", "role", "transactionId", "userId") VALUES ('6faf1ac3-d1d1-4194-bd8d-7bfbd9814faa', 'Agent', 'c36e759d-220b-4799-95f2-6a8680dc5e11', '91f58895-6564-41ac-ac6a-fcfd09526c6d');
INSERT INTO "TransactionParticipant" ("id", "role", "transactionId", "userId") VALUES ('312f0b5f-65ec-4cfd-8985-db5e946ce15e', 'Seller', '2b3b6d7c-7b94-4205-8e73-ebf83ed877c6', 'c04eae52-145e-4147-a5f7-e085d7c3e44a');
INSERT INTO "TransactionParticipant" ("id", "role", "transactionId", "userId") VALUES ('fb106fc6-635f-411f-84c4-87926aea930f', 'Broker', '35fe192d-3578-4002-bfb2-c066c990560c', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TransactionParticipant" ("id", "role", "transactionId", "userId") VALUES ('019bb99d-2746-4d15-b34e-7daacad0df37', 'Seller', 'faf1874c-64fe-4e0a-bbc8-120dd9e0c460', 'cebfc049-ce6e-4098-a10e-1fccbe860653');
INSERT INTO "TransactionParticipant" ("id", "role", "transactionId", "userId") VALUES ('73dfea59-6359-4cf2-b365-a700762c339c', 'Inspector', '35fe192d-3578-4002-bfb2-c066c990560c', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TransactionParticipant" ("id", "role", "transactionId", "userId") VALUES ('8562c7d1-e130-4a7f-9bc0-19cbbd1cf51c', 'Seller', 'c36e759d-220b-4799-95f2-6a8680dc5e11', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TransactionParticipant" ("id", "role", "transactionId", "userId") VALUES ('d9cca96a-888b-4c05-9922-58dda97d1673', 'Broker', 'eff0a453-770f-4fc0-9454-e0b3350648ca', '7dfdd779-062f-4ad8-b3f0-43c242cfb3ab');
INSERT INTO "TransactionParticipant" ("id", "role", "transactionId", "userId") VALUES ('bebd9bb5-bc50-4a8d-a521-646678dbc373', 'Seller', '1cb8044c-936c-4784-92c2-42da06cc382e', '43a1f213-588b-4d49-bd5e-f4263309b86f');
INSERT INTO "TransactionParticipant" ("id", "role", "transactionId", "userId") VALUES ('c0930503-6a67-40a8-b241-fc481073bf73', 'Inspector', 'a01bd4bd-bafe-499b-898e-aebf64b6fecc', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TransactionParticipant" ("id", "role", "transactionId", "userId") VALUES ('70b60c44-85eb-4fea-b722-9bd0e363f610', 'Buyer', 'addfea64-e459-4809-a3c9-c45c72fbc522', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "Document" ("id", "name", "type", "url", "permissions", "propertyId", "transactionId") VALUES ('bee52bcc-f94f-411c-bf0e-7f1183bba257', 'Inspection Report', 'Image', 'https://i.imgur.com/YfJQV5z.png?id=373', '{"officiis":"minus","carbo":"spiritus","apud":"conor","calcar":"debeo","aiunt":"comparo"}'::jsonb, 'b0c2017c-e450-45c1-b4a3-fff0983a0ec1', 'f422dd45-67bc-4422-84e7-b3cc87d15232');
INSERT INTO "Document" ("id", "name", "type", "url", "permissions", "propertyId", "transactionId") VALUES ('4d6233ff-631e-4215-9e6c-f4b9c4e8c313', 'Purchase Agreement', 'PDF', 'https://i.imgur.com/YfJQV5z.png?id=378', '{"quasi":"video","umerus":"nobis","culpo":"sulum","cunctatio":"centum","cauda":"aeternus"}'::jsonb, '493ae7fa-9249-42ef-8e52-63434cdd834a', '1cb8044c-936c-4784-92c2-42da06cc382e');
INSERT INTO "Document" ("id", "name", "type", "url", "permissions", "propertyId", "transactionId") VALUES ('b611d5e2-1347-4aed-b5c9-e28a41ba43e2', 'Inspection Report', 'Spreadsheet', 'https://i.imgur.com/YfJQV5z.png?id=383', '{"sto":"harum","undique":"tabella","accusator":"solvo","victus":"deleniti","tertius":"crinis"}'::jsonb, 'e53c7bdf-a91c-4797-8f9e-457ab4996ce8', 'faf1874c-64fe-4e0a-bbc8-120dd9e0c460');
INSERT INTO "Document" ("id", "name", "type", "url", "permissions", "propertyId", "transactionId") VALUES ('14ca480a-24bf-4707-a9be-34003007b636', 'Inspection Report', 'PDF', 'https://i.imgur.com/YfJQV5z.png?id=388', '{"desino":"ater","video":"creo","vigor":"amor"}'::jsonb, '42ae67fc-6a3e-4b18-8894-2219cbcf84b8', '35fe192d-3578-4002-bfb2-c066c990560c');
INSERT INTO "Document" ("id", "name", "type", "url", "permissions", "propertyId", "transactionId") VALUES ('9641a77c-eed3-41e7-906f-6018c5a43ad6', 'Property Deed', 'Spreadsheet', 'https://i.imgur.com/YfJQV5z.png?id=393', '{"conturbo":"suscipio","degusto":"antiquus","solutio":"consequuntur","tepidus":"cruentus","distinctio":"quo"}'::jsonb, '887b8161-f169-4cc2-80f4-a35133704f6b', '1cb8044c-936c-4784-92c2-42da06cc382e');
INSERT INTO "Document" ("id", "name", "type", "url", "permissions", "propertyId", "transactionId") VALUES ('339a750c-0698-427a-8ec9-be9581a01478', 'Purchase Agreement', 'Text File', 'https://i.imgur.com/YfJQV5z.png?id=398', '{"aequus":"laborum","defluo":"adnuo","ventus":"iure","soleo":"theca"}'::jsonb, '4c2708f4-dfc1-44d4-90ae-35e51be2b236', 'faf1874c-64fe-4e0a-bbc8-120dd9e0c460');
INSERT INTO "Document" ("id", "name", "type", "url", "permissions", "propertyId", "transactionId") VALUES ('6e39b5dc-b6eb-4a55-9337-ac13dadda771', 'Inspection Report', 'Text File', 'https://i.imgur.com/YfJQV5z.png?id=403', '{"consuasor":"territo","pariatur":"ea","speciosus":"vorax"}'::jsonb, 'b0c2017c-e450-45c1-b4a3-fff0983a0ec1', 'eff0a453-770f-4fc0-9454-e0b3350648ca');
INSERT INTO "Document" ("id", "name", "type", "url", "permissions", "propertyId", "transactionId") VALUES ('67f283a8-7c8f-428d-a370-5386ccc0be5c', 'Inspection Report', 'Spreadsheet', 'https://i.imgur.com/YfJQV5z.png?id=408', '{"curis":"sono","valeo":"termes","complectus":"iste","temeritas":"collum","barba":"amo"}'::jsonb, '493ae7fa-9249-42ef-8e52-63434cdd834a', 'addfea64-e459-4809-a3c9-c45c72fbc522');
INSERT INTO "Document" ("id", "name", "type", "url", "permissions", "propertyId", "transactionId") VALUES ('698b52e3-94ce-4a23-b431-80c80ebabdb1', 'Closing Disclosure', 'Text File', 'https://i.imgur.com/YfJQV5z.png?id=413', '{"pax":"eligendi","conicio":"complectus","non":"correptius","accusamus":"votum"}'::jsonb, '2721f9a3-0a30-435d-a824-9a1d8d955da3', '662ebeaf-2a6b-411b-a65a-dcefa8f0c076');
INSERT INTO "Document" ("id", "name", "type", "url", "permissions", "propertyId", "transactionId") VALUES ('ca8e130d-6b7b-428f-af34-749b5d384442', 'Purchase Agreement', 'Text File', 'https://i.imgur.com/YfJQV5z.png?id=418', '{"degenero":"terebro","careo":"assumenda","fuga":"pauper"}'::jsonb, '493ae7fa-9249-42ef-8e52-63434cdd834a', '662ebeaf-2a6b-411b-a65a-dcefa8f0c076');

INSERT INTO "Appointment" ("id", "type", "startTime", "endTime", "status", "organizationId", "propertyId", "transactionId") VALUES ('f6359d84-1761-45f2-a29e-cb062f716ee3', 'Appraisal', '2025-11-29T00:01:30.861Z', '2025-10-08T06:47:42.579Z', 'Scheduled', 'fc57e921-4e6c-45e3-b5cf-3b5ff789e051', 'e53c7bdf-a91c-4797-8f9e-457ab4996ce8', 'faf1874c-64fe-4e0a-bbc8-120dd9e0c460');
INSERT INTO "Appointment" ("id", "type", "startTime", "endTime", "status", "organizationId", "propertyId", "transactionId") VALUES ('169d8fcc-6093-405d-b4eb-d9165ac5412b', 'Inspection', '2024-03-14T09:01:03.716Z', '2023-12-17T04:21:58.952Z', 'Cancelled', '0b2b08df-c2da-4e12-87de-ba3f2450eb15', 'b0c2017c-e450-45c1-b4a3-fff0983a0ec1', 'a01bd4bd-bafe-499b-898e-aebf64b6fecc');
INSERT INTO "Appointment" ("id", "type", "startTime", "endTime", "status", "organizationId", "propertyId", "transactionId") VALUES ('6b98674a-e8b9-4b38-9213-2bc993e2ad74', 'Appraisal', '2025-06-23T16:47:01.724Z', '2025-03-07T09:34:22.018Z', 'Scheduled', '7ca607a2-ce73-461e-97fd-09872e736404', '42ae67fc-6a3e-4b18-8894-2219cbcf84b8', '662ebeaf-2a6b-411b-a65a-dcefa8f0c076');
INSERT INTO "Appointment" ("id", "type", "startTime", "endTime", "status", "organizationId", "propertyId", "transactionId") VALUES ('80171c19-fc3e-4179-af23-15360d6e5bfb', 'Property Viewing', '2024-05-25T21:02:32.676Z', '2024-03-12T15:17:12.161Z', 'Rescheduled', 'fc57e921-4e6c-45e3-b5cf-3b5ff789e051', 'a22fb03e-82f9-4cf7-a278-c92e2d037edd', '2b3b6d7c-7b94-4205-8e73-ebf83ed877c6');
INSERT INTO "Appointment" ("id", "type", "startTime", "endTime", "status", "organizationId", "propertyId", "transactionId") VALUES ('f4ee8868-d9f5-4ceb-8273-eb9965153110', 'Closing Meeting', '2025-01-10T14:33:33.919Z', '2024-07-04T22:17:14.041Z', 'Scheduled', '0b2b08df-c2da-4e12-87de-ba3f2450eb15', 'a22fb03e-82f9-4cf7-a278-c92e2d037edd', 'addfea64-e459-4809-a3c9-c45c72fbc522');
INSERT INTO "Appointment" ("id", "type", "startTime", "endTime", "status", "organizationId", "propertyId", "transactionId") VALUES ('621b0b1c-8a60-4642-8e2b-0ef00916cd5c', 'Closing Meeting', '2024-12-21T17:14:08.808Z', '2025-11-09T23:20:56.749Z', 'Completed', '37dc17a4-7d06-45b8-9d63-fefbef365458', 'd8bf958b-50da-4460-b1b7-1609cd881c9e', 'eff0a453-770f-4fc0-9454-e0b3350648ca');
INSERT INTO "Appointment" ("id", "type", "startTime", "endTime", "status", "organizationId", "propertyId", "transactionId") VALUES ('3dde0eac-14e3-49c4-8a8a-3f8915aedfc8', 'Appraisal', '2025-02-23T09:20:54.943Z', '2025-10-20T21:23:24.172Z', 'Completed', '87206efc-4a05-4444-8719-83ab1fcf8b12', 'd8bf958b-50da-4460-b1b7-1609cd881c9e', 'a01bd4bd-bafe-499b-898e-aebf64b6fecc');
INSERT INTO "Appointment" ("id", "type", "startTime", "endTime", "status", "organizationId", "propertyId", "transactionId") VALUES ('8367bf8e-0801-414b-bb08-7b3b4ff3ec12', 'Property Viewing', '2024-02-29T00:16:43.087Z', '2024-05-10T12:54:17.612Z', 'Pending', 'dea4e916-b92e-45ce-baca-b2f8368a5988', '887b8161-f169-4cc2-80f4-a35133704f6b', 'faf1874c-64fe-4e0a-bbc8-120dd9e0c460');
INSERT INTO "Appointment" ("id", "type", "startTime", "endTime", "status", "organizationId", "propertyId", "transactionId") VALUES ('4a5b2a43-fafd-4e71-b434-29dd3d71dca4', 'Consultation', '2025-10-29T08:32:27.643Z', '2025-03-26T03:46:20.079Z', 'Cancelled', 'fc57e921-4e6c-45e3-b5cf-3b5ff789e051', '5cb6bea0-7481-456a-a466-7dbc6aef4cae', 'c36e759d-220b-4799-95f2-6a8680dc5e11');
INSERT INTO "Appointment" ("id", "type", "startTime", "endTime", "status", "organizationId", "propertyId", "transactionId") VALUES ('b9c38ca4-eca9-42f5-bdec-58bbb9ded6d9', 'Closing Meeting', '2024-07-06T20:45:18.017Z', '2025-08-23T23:13:27.441Z', 'Pending', 'dea4e916-b92e-45ce-baca-b2f8368a5988', '493ae7fa-9249-42ef-8e52-63434cdd834a', 'a01bd4bd-bafe-499b-898e-aebf64b6fecc');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })