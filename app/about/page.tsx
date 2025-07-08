export default function AboutPage() {
  return (
    <div>
      <h1 className="mb-16 mt-4 text-center text-5xl max-sm:text-4xl">About me</h1>
      <div className="flex justify-center mb-8">
        <Image
          src="/images/profile.jpg" />
      </div>
      <article>
        <p>
        If I could sum up my career, I would say that it is a bridge. A bridge between the solidity of architecture and the fluidity of technology.
        </p>
        <p>
          It all started with a love of designing spaces that breathed, that had a purpose. But restlessness made me realize that walls and plans could go further. It was in technology that I found the tools to expand these boundaries.
        </p>

        <p>
          Today, in my master`s degree in Computer Science, this search continues. My tools now include Java, Python and machine learning algorithms, but the ultimate goal remains the same: to use technology to create a more human, sustainable and inspiring architecture. I believe that the future lies in the intelligent fusion of these two worlds, and it is to build this future that I dedicate myself every day. My learning is practical, my motivation is impact, and my passion is to connect the physical with the digital to improve the way we live.
        </p>
      </article>
    </div>
  );
}