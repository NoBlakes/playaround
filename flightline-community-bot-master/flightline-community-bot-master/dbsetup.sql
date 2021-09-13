--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.login_details (
    username text,
    password text,
    discord_id numeric
);

CREATE TABLE public.login_logs (
    staff_user_id numeric,
    username text,
    airport_served text,
    position_served text,
    time_start text,
    time_end text,
    status text,
    duration text,
    durationunix numeric,
    time_end_unix numeric
);

--
-- PostgreSQL database dump complete
--

