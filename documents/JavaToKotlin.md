# Why we switched from Java to Kotlin (Meta)

Nullability: Kotlin has built-in nullability handling that is more robust and easier to work with than Java, which can help to avoid null pointer exceptions.

Functional programming: Kotlin's support for inline functions and lambda expressions allows for the use of a functional programming style without compromising execution speed, making it a better alternative to Java.

Shorter code: Kotlin's modern design makes its code shorter, and it allows for dropping explicit types, which can make code more explicit and easier to follow.

Domain-specific language (DSL) / Type-safe builders: Kotlin's various features come together and let developers define a DSL, making it possible to move definitions such as Android XMLs to be implemented directly in Kotlin code.

Maintaining execution speed: Kotlin compiles to the same JVM bytecode as Java, which means there is no expected performance regression in terms of execution speed when switching to Kotlin. After running multiple A/B tests Kotlin was found to match or exceed Java in performance.

Build size is not an issue: The Kotlin standard library is relatively small, and since most releases use Proguard and Redex, only some of it even makes it into a release APK. Therefore, size hasn’t proved to be a problem except in situations where a few KBs of extra code matter. However, by avoiding Kotlin’s standard library and using the already available Java methods, the problem can be solved.

However, adopting Kotlin also has a few disadvantages:

Mixed codebase: Adopting another language could mean dealing with a mixed codebase of two languages for a long time. Kotlin is good at interacting with Java, but quirks do pop up at times.

Popularity gap: Java is still more popular than Kotlin, so fewer tools are available, and all Kotlin tools need to account for Kotlin and Java interoperability, which complicates their implementation.

Build times: Kotlin's build times can be longer than Java's due to its more complicated ecosystem, which can negatively impact developers' experience.

