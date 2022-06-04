/* eslint-disable @next/next/no-img-element */
import styles from "../styles/home.module.css";
import Link from "next/link";
import Image from 'next/image';
import { createClient } from "../utils/client";
import { FaGithub } from "react-icons/fa";
import { formatPrices } from "../utils/prices";
import { useContext } from "react";
import StoreContext from "../context/store-context";

const tags = [
  { name: "Medusa", to: "https://www.medusa-commerce.com/" },
  { name: "Next.js", to: "https://nextjs.org/docs/getting-started" },
  { name: "Stripe", to: "https://stripe.com/docs" },
];

export default function Home({ products }) {
  const { cart } = useContext(StoreContext)
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Medusa + Next.js Starter{" "}
            <span role="img" aria-label="Rocket emoji">
              🚀
            </span>
          </h1>
          <p className={styles.description}>
            Build blazing-fast client applications on top of a modular headless
            commerce engine. Integrate seamlessly with any 3rd party tools for a
            best-in-breed commerce stack.
          </p>
          <div style={{}}>
            {tags.map((tag, index) => (
              // <li key={index}>
              <a
                key={index}
                href={tag.to}
                className={styles.tag}
                target="_blank"
                rel="noreferrer"
                role="button"
                style={{ marginRight: "0.5rem" }}
              >
                {tag.name}
              </a>
              // </li>
            ))}
          </div>
          {/* <div className={styles.tags}>
            <div className={styles.tag} style={{ background: "lightgrey" }}>
              v{process.env.NEXT_PUBLIC_APP_VERSION}
            </div>
            <a
              href="https://www.medusa-commerce.com/"
              arget="_blank"
              rel="noreferrer"
              role="button"
            >
              <div
                className={styles.tag}
                style={{ background: "var(--logo-color-900)", color: "white" }}
              >
                Medusa
              </div>
            </a>
            <a
              href="https://nextjs.org/docs/getting-started"
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              <div
                className={styles.tag}
                style={{ background: "#111111", color: "white" }}
              >
                Next.js
              </div>
            </a>
            <a
              href="https://stripe.com/docs"
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              <div
                className={styles.tag}
                style={{ background: "#4379FF", color: "white" }}
              >
                Stripe
              </div>
            </a>
          </div> */}
          <div className={styles.links}>
            <a
              href="https://docs.medusa-commerce.com/"
              target="_blank"
              rel="noreferrer"
              role="button"
              className={`${styles.btn} ${styles.primary_btn}`}
            >
              Read the docs
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
              </svg>
            </a>
            <a
              href="https://github.com/medusajs/nextjs-starter-medusa"
              target="_blank"
              rel="noreferrer"
              role="button"
              className={`${styles.btn} ${styles.tranparent_btn}`}
            >
              View on GitHub
              <FaGithub />
            </a>
          </div>
        </div>
        <div className={styles.products}>
          <h2>Checkout our store</h2>
          <div className={styles.grid}>
            {products &&
              products.map((p) => {
                return (
                  <div key={p.id} className={styles.card}>
                    <Link
                      href={{ pathname: `/product/[id]`, query: { id: p.id } }}
                      passHref
                    >
                      <a>
                        <div className={styles.product_thumbnail}>
                          <img src={p.thumbnail} alt={p.title} />
                        </div>
                        <div className={styles.product_info}>
                          <h2 className={styles.product_title}>{p.title}</h2>
                          <p className={styles.product_price}>
                            {formatPrices(cart, p.variants[0])}
                          </p>
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const client = createClient();
  const { products } = await client.products.list();

  return {
    props: {
      products,
    },
  };
};
