--
-- PostgreSQL database dump
--

-- Dumped from database version 13.13
-- Dumped by pg_dump version 13.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_catalog_id_fkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_pkey;
ALTER TABLE ONLY public.catalog DROP CONSTRAINT catalog_pkey;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.inventory ALTER COLUMN catalog_id DROP DEFAULT;
ALTER TABLE public.inventory ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.catalog ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.tags_id_seq;
DROP TABLE public.tags;
DROP SEQUENCE public.migrations_id_seq;
DROP TABLE public.migrations;
DROP SEQUENCE public.inventory_id_seq;
DROP SEQUENCE public.inventory_catalog_id_seq;
DROP TABLE public.inventory;
DROP SEQUENCE public.catalog_id_seq;
DROP TABLE public.catalog;
DROP TYPE public.status;
--
-- Name: status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.status AS ENUM (
    'internal',
    'external'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: catalog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.catalog (
    id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: catalog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.catalog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: catalog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.catalog_id_seq OWNED BY public.catalog.id;


--
-- Name: inventory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventory (
    id bigint NOT NULL,
    name text NOT NULL,
    sku text NOT NULL,
    archived timestamp with time zone,
    description text,
    rental_price integer,
    images jsonb,
    tags_id bigint[],
    catalog_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    inventory_uuid uuid DEFAULT gen_random_uuid() NOT NULL
);


--
-- Name: inventory_catalog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.inventory_catalog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: inventory_catalog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.inventory_catalog_id_seq OWNED BY public.inventory.catalog_id;


--
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.inventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.inventory_id_seq OWNED BY public.inventory.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    file_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    id bigint NOT NULL,
    tag text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    status public.status NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text,
    phone text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    user_uuid uuid DEFAULT gen_random_uuid() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: catalog id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalog ALTER COLUMN id SET DEFAULT nextval('public.catalog_id_seq'::regclass);


--
-- Name: inventory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_id_seq'::regclass);


--
-- Name: inventory catalog_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory ALTER COLUMN catalog_id SET DEFAULT nextval('public.inventory_catalog_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: catalog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.catalog (id, name, created_at) FROM stdin;
1	Large Tool	2025-09-29 21:30:29.392588-04
2	Small Tool	2025-09-29 21:30:29.392588-04
\.


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.inventory (id, name, sku, archived, description, rental_price, images, tags_id, catalog_id, created_at, inventory_uuid) FROM stdin;
1	Electric Jackhammer	76079027	\N	Heavy-duty jackhammer for breaking up concrete and asphalt.	85	\N	\N	1	2025-09-29 21:30:29.392588-04	d6ffade2-5547-4f87-875d-daf03c210c72
2	Towable Boom Lift	72374202	\N	Articulating lift with a 40 ft reach, ideal for construction and tree trimming.	220	\N	\N	1	2025-09-29 21:30:29.392588-04	28fbdb4a-9aba-43de-9434-be61f36a45fb
3	Ride-On Trencher	87341055	\N	Gas-powered trencher designed for digging trenches quickly and efficiently.	180	\N	\N	1	2025-09-29 21:30:29.392588-04	a4c6fc4a-37a8-49cd-a63d-a3b05ab25bb0
4	Skid Steer Loader	13593338	\N	Compact loader for landscaping, construction, and material moving.	200	\N	\N	1	2025-09-29 21:30:29.392588-04	71c31141-0f6c-43b0-a26b-0187c541774b
5	Mini Excavator	63621030	\N	6,000 lb excavator for digging and earthmoving in tight spaces.	250	\N	\N	1	2025-09-29 21:30:29.392588-04	e864fdce-f6df-4f73-a374-66e298218582
6	Plate Compactor	67524062	\N	Vibratory compactor for soil, gravel, and asphalt compaction.	90	\N	\N	1	2025-09-29 21:30:29.392588-04	dd6cb4b9-0ef7-4a06-be57-2e67deaa2f2e
7	Towable Air Compressor	99898996	\N	185 CFM compressor, commonly used to power pneumatic tools.	150	\N	\N	1	2025-09-29 21:30:29.392588-04	5d7129b8-badb-4bc0-819f-2a64d149777f
8	Concrete Mixer (Towable)	37468803	\N	9 cu ft towable mixer for large concrete jobs.	100	\N	\N	1	2025-09-29 21:30:29.392588-04	536c32e2-36a0-447e-b804-01bae4ee666a
9	Wood Chipper	82085617	\N	12-inch capacity wood chipper for branches and yard debris.	190	\N	\N	1	2025-09-29 21:30:29.392588-04	1da4a252-289c-4cef-855c-5f421961acc4
10	Scissor Lift	20149474	\N	Electric scissor lift with a 26 ft platform height.	210	\N	\N	1	2025-09-29 21:30:29.392588-04	e998ed88-ecea-4e57-9a13-b060205b88a7
11	Walk-Behind Trencher	27659147	\N	Compact trencher for irrigation and cable lines.	130	\N	\N	1	2025-09-29 21:30:29.392588-04	effc9cf3-1e9d-4611-b03d-057b91c80d99
12	Concrete Saw (Walk-Behind)	62627534	\N	14-inch blade saw for cutting concrete and asphalt surfaces.	110	\N	\N	1	2025-09-29 21:30:29.392588-04	077ebb64-5595-4946-b7d4-685684b9edd0
13	Stump Grinder	31281747	\N	Hydraulic grinder for removing tree stumps up to 18 inches deep.	175	\N	\N	1	2025-09-29 21:30:29.392588-04	743b6610-7737-4d04-894e-227312d6a8ad
14	Power Trowel	55664781	\N	36-inch ride-on power trowel for finishing concrete slabs.	160	\N	\N	1	2025-09-29 21:30:29.392588-04	00be57c8-96ea-4595-8bae-5b306524901b
15	Portable Light Tower	32604359	\N	Towable LED light tower for illuminating job sites at night.	140	\N	\N	1	2025-09-29 21:30:29.392588-04	7cf9b6c4-a6f6-4aaa-b120-562b0ac3f5bc
16	Lawn Aerator (Tow-Behind)	46900894	\N	Core aerator attachment for tractors or lawn machines.	85	\N	\N	1	2025-09-29 21:30:29.392588-04	3226a27f-1172-4ea2-b4d9-436570fc505a
17	Tractor with Loader	38523280	\N	Compact tractor equipped with a front loader bucket.	260	\N	\N	1	2025-09-29 21:30:29.392588-04	e5955565-ae86-4e10-bae8-c041854c9329
18	Pressure Washer (Hot Water, Trailer-Mounted)	29096652	\N	High PSI washer for industrial cleaning jobs.	200	\N	\N	1	2025-09-29 21:30:29.392588-04	f401f777-cf51-4698-b88c-7686a976127b
19	Forklift (5,000 lb)	37460908	\N	Industrial forklift for moving heavy pallets and materials.	230	\N	\N	1	2025-09-29 21:30:29.392588-04	c04a75b4-b6a0-4286-9ee0-849c5d45a10a
20	Asphalt Roller	74459767	\N	1.5-ton roller for compacting asphalt and base materials.	275	\N	\N	1	2025-09-29 21:30:29.392588-04	d25d418f-b02b-4fff-ab30-b1a9e2b2ffc3
21	Brush Cutter (Tow-Behind)	83405571	\N	Heavy-duty mower for fields and overgrown lots.	180	\N	\N	1	2025-09-29 21:30:29.392588-04	6e68f8dd-cfb1-425b-9c7b-c7e7252a457b
22	Concrete Pump	67669808	\N	Towable concrete pump for large pouring jobs.	290	\N	\N	1	2025-09-29 21:30:29.392588-04	ee596bb4-cc16-4ee9-a996-2d6ded7ead08
23	Dump Trailer	93970969	\N	Hydraulic dump trailer with 5-ton capacity.	150	\N	\N	1	2025-09-29 21:30:29.392588-04	701cd1d7-36ab-4f9a-9514-5ae001697023
24	Utility Tractor	61856979	\N	Mid-size tractor with multiple attachments available.	280	\N	\N	1	2025-09-29 21:30:29.392588-04	5485beda-7b04-4a25-99b9-9a27c848e6cc
25	Boom Truck	42356475	\N	Truck-mounted crane for lifting and hoisting materials.	350	\N	\N	1	2025-09-29 21:30:29.392588-04	6f41e42f-0862-41dc-9a16-bc054c302682
26	Cordless Drill	96736172	\N	18V lithium-ion drill/driver with variable speed settings.	20	\N	\N	2	2025-09-29 21:30:29.392588-04	f8ff5da8-950a-447b-9f6c-603ddc250633
27	Angle Grinder	89070301	\N	4.5-inch grinder for cutting and grinding metal or masonry.	18	\N	\N	2	2025-09-29 21:30:29.392588-04	97ed5d9e-271a-4c15-aa3e-fd678c022166
28	Orbital Sander	85811337	\N	Random orbital sander for smooth wood finishing.	15	\N	\N	2	2025-09-29 21:30:29.392588-04	f24733b3-e855-4ea7-8749-2a13bb8ea2fe
29	Heat Gun	27232527	\N	Variable temperature heat gun for paint stripping and shrink wrapping.	12	\N	\N	2	2025-09-29 21:30:29.392588-04	73e14dbf-5197-4d15-b5e7-adbad0c5c978
30	Hammer Drill	18072418	\N	Corded drill with hammer action for masonry work.	22	\N	\N	2	2025-09-29 21:30:29.392588-04	a7d4d91d-0438-4af9-a4a4-fd22de688b8e
31	Impact Driver	64350220	\N	Compact driver for fastening screws and bolts.	20	\N	\N	2	2025-09-29 21:30:29.392588-04	4d77a709-3950-48d6-8459-1b400bca903b
32	Tile Saw	46210003	\N	7-inch wet tile saw for precision tile cutting.	25	\N	\N	2	2025-09-29 21:30:29.392588-04	bad41158-c778-4b97-b6aa-b36473446519
33	Shop Vacuum	14099831	\N	12-gallon wet/dry vacuum for job site cleanup.	18	\N	\N	2	2025-09-29 21:30:29.392588-04	ab389f29-aba9-4431-a301-ed834253d249
34	Pipe Threader	25070756	\N	Electric pipe threader for plumbing jobs.	30	\N	\N	2	2025-09-29 21:30:29.392588-04	d3b4a0ba-564d-4674-b7a7-1ed386b58524
35	Caulking Gun (Electric)	35790162	\N	Powered caulking gun for consistent sealant application.	14	\N	\N	2	2025-09-29 21:30:29.392588-04	4d2189d7-af1d-42ad-8ee9-9956ec28e522
36	Staple Gun	97701707	\N	Manual heavy-duty stapler for upholstery and construction.	10	\N	\N	2	2025-09-29 21:30:29.392588-04	1c81ba74-caa8-4898-9980-7925f86f0977
37	Jigsaw	86715055	\N	Variable speed jigsaw for cutting curves in wood and metal.	15	\N	\N	2	2025-09-29 21:30:29.392588-04	df0418cc-f037-4b49-a691-f3288a364561
38	Reciprocating Saw	13968104	\N	Cordless saw for demolition and rough cuts.	22	\N	\N	2	2025-09-29 21:30:29.392588-04	1db88117-9be7-4885-b973-ab5a9b1b685a
39	Lawn Edger	75909905	\N	Gas-powered edger for clean lawn borders.	18	\N	\N	2	2025-09-29 21:30:29.392588-04	ddc5076a-f552-44c7-ad13-27cbbb34ce4e
40	Hedge Trimmer	92009649	\N	22-inch blade hedge trimmer for yard maintenance.	20	\N	\N	2	2025-09-29 21:30:29.392588-04	4971f863-1ac7-490d-adb2-e426d65e877f
41	Paint Sprayer	32922845	\N	Handheld sprayer for smooth paint finishes.	28	\N	\N	2	2025-09-29 21:30:29.392588-04	5a434c6a-5d40-43ff-946f-7d9156d19657
42	Moisture Meter	27896820	\N	Digital moisture tester for wood and drywall.	12	\N	\N	2	2025-09-29 21:30:29.392588-04	fdc8bc2e-05ec-4603-a277-ecb463382c18
43	Stud Finder	21804051	\N	Electronic stud finder for locating wall studs.	8	\N	\N	2	2025-09-29 21:30:29.392588-04	7dac7747-c855-48fd-bcca-43e9ee9e58f0
44	Rotary Laser Level	36246727	\N	Self-leveling rotary laser for layout and grading.	35	\N	\N	2	2025-09-29 21:30:29.392588-04	9bfbe380-82a1-41a4-8765-86e1022f3058
45	Concrete Vibrator	38050071	\N	Handheld vibrator for removing air bubbles in wet concrete.	30	\N	\N	2	2025-09-29 21:30:29.392588-04	e0dc356e-f754-479a-9657-e600ef6a3639
46	Power Auger (Handheld)	70384460	\N	Gas-powered auger for digging fence post holes.	25	\N	\N	2	2025-09-29 21:30:29.392588-04	592cf1d4-8283-40a0-a612-81d925271419
47	Pipe Cutter	62529212	\N	Manual cutter for copper, aluminum, and PVC pipes.	10	\N	\N	2	2025-09-29 21:30:29.392588-04	2e6a3b7c-9c89-4746-a8a8-c1e414d719be
48	Extension Cord Reel	33608723	\N	50 ft heavy-duty cord reel for job sites.	7	\N	\N	2	2025-09-29 21:30:29.392588-04	e029fc32-552b-403c-8d0f-9e3ec21e2cf0
49	Bolt Cutter	77648380	\N	36-inch bolt cutter for locks, chain, and rebar.	15	\N	\N	2	2025-09-29 21:30:29.392588-04	22c9c421-4dc3-48d8-ad88-e88aa58c62c1
50	Laser Distance Meter	22046354	\N	Compact laser measure with up to 100 ft range.	18	\N	\N	2	2025-09-29 21:30:29.392588-04	8ebe92d7-590e-4815-8f8b-206984def8af
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, file_name, created_at) FROM stdin;
1	2025_08_04_init_migrations.sql	2025-09-29 20:32:47.721408-04
2	2025_08_18_init_catalog_inventory_tags.sql	2025-09-29 20:32:47.722907-04
3	2025_08_26_init_users.sql	2025-09-29 20:32:47.723141-04
4	2025_08_28_add_users_uuid.sql	2025-09-29 20:32:47.723333-04
5	2025_09_23_add_inventory_uuid.sql	2025-09-29 20:32:47.723539-04
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tags (id, tag, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, status, first_name, last_name, email, phone, created_at, user_uuid) FROM stdin;
\.


--
-- Name: catalog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.catalog_id_seq', 2, true);


--
-- Name: inventory_catalog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.inventory_catalog_id_seq', 1, false);


--
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.inventory_id_seq', 50, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tags_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: catalog catalog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalog
    ADD CONSTRAINT catalog_pkey PRIMARY KEY (id);


--
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: inventory inventory_catalog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_catalog_id_fkey FOREIGN KEY (catalog_id) REFERENCES public.catalog(id);


--
-- PostgreSQL database dump complete
--

