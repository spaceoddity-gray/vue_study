<template>
    <section class="relative grid grid-rows-[1fr_auto] min-h-dvh bg-slate-100 bg-auth-bg bg-full bg-opacity-5">
        <div class="container h-full m-auto px-4">
            <slot />
        </div>
        <footer class="flex justify-end py-6 px-12 text-xs">
            <span>
                © 2024, Space Oddity Inc., All rights reserved.
            </span>
        </footer>
    </section>
</template>