const { PrismaClient } = require("@prisma/client");
const readline = require("readline");
const fs = require("fs");

const prisma = new PrismaClient();

async function seedNames() {
	const rl = readline.createInterface({
		input: fs.createReadStream("e:/name.json"),
		crlfDelay: Infinity,
	});

	for await (const line of rl) {
		const name = JSON.parse(line);
		try {
			await prisma.name.upsert({
				where: { nconst: name.nconst },
				update: {},
				create: {
					nconst: name.nconst,
					primaryName: name.primaryName,
					birthYear: name.birthYear,
					deathYear: name.deathYear,
					primaryProfession: { set: name.primaryProfession },
					knownForTitles: { set: name.knownForTitles },
				},
			});
		} catch (e) {
			console.error(`Error upserting name: ${e}`);
		}
	}
}

// seedNames()
// 	.catch((e) => console.error(e))
// 	.finally(async () => {
// 		await prisma.$disconnect();
// 	});

async function seedCrew() {
	const rl = readline.createInterface({
		input: fs.createReadStream("e:/crew.json"),
		crlfDelay: Infinity,
	});

	for await (const line of rl) {
		const crew = JSON.parse(line);
		try {
			await prisma.crew.upsert({
				where: { tconst: crew.tconst },
				update: {},
				create: {
					tconst: crew.tconst,
					directors: { set: crew.directors },
					writers: { set: crew.writers },
				},
			});
		} catch (e) {
			console.error(`Error upserting names: ${e}`);
		}
	}
}

// seedCrew()
// 	.catch((e) => console.error(e))
// 	.finally(async () => {
// 		await prisma.$disconnect();
// 	});

// async function seedPrincipals() {
// 	const rl = readline.createInterface({
// 		input: fs.createReadStream("e:/principals.json"),
// 		crlfDelay: Infinity,
// 	});

// 	for await (const line of rl) {
// 		const principals = JSON.parse(line);

// 		try {
// 			await prisma.principals.upsert({
// 				where: { tconst_nconst: { tconst: principals.tconst, nconst: principals.nconst } },
// 				update: {},
// 				create: {
// 					tconst: principals.tconst,
// 					ordering: principals.ordering,
// 					nconst: principals.nconst,
// 					category: principals.category,
// 					job: principals.job,
// 					characters: { set: principals.characters },
// 				},
// 			});
// 		} catch (e) {
// 			console.error(`Error upserting principals: ${e}`);
// 		}
// 	}
// }

seedCrew();
seedNames()
	// seedPrincipals()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
