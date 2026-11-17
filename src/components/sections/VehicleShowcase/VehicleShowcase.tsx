import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ImagePlus } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { VehicleChapter, VehicleShowcaseItem } from '../../../data/vehicleShowcase';
import { vehicleShowcaseData } from '../../../data/vehicleShowcase';
import './VehicleShowcase.css';

gsap.registerPlugin(ScrollTrigger);

interface PhotoTileProps {
  vehicleName: string;
  photo: VehicleChapter['photos'][number];
  priority?: boolean;
  defer?: boolean;
}

function PhotoTile({ vehicleName, photo, priority = false, defer = false }: PhotoTileProps) {
  if (photo.image) {
    return (
      <div className="vehicle-showcase__photo">
        <img
          {...(defer ? { 'data-deferred-src': photo.image } : { src: photo.image })}
          alt={`${vehicleName} — ${photo.label.toLowerCase()}`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => requestAnimationFrame(() => ScrollTrigger.refresh())}
        />
      </div>
    );
  }

  return (
    <div
      className="vehicle-showcase__photo-placeholder"
      role="img"
      aria-label={`Photo needed for ${vehicleName}: ${photo.label}`}
      data-asset-placeholder={photo.expectedPath}
    >
      <ImagePlus aria-hidden="true" />
      <span>{photo.label}</span>
      <code>{photo.expectedPath.replace('/images/', 'public/images/')}</code>
      <small>Matching vehicle photo needed</small>
      <span className="sr-only">Displayed as a placeholder, not a vehicle photograph.</span>
    </div>
  );
}

interface VehicleSceneProps {
  vehicle: VehicleShowcaseItem;
  chapter: VehicleChapter;
  sceneIndex: number;
  priority?: boolean;
  deferImages?: boolean;
}

function VehicleScene({ vehicle, chapter, sceneIndex, priority = false, deferImages = false }: VehicleSceneProps) {
  return (
    <div
      className="vehicle-showcase__scene"
      data-scene-index={sceneIndex}
      data-chapter={chapter.key}
      aria-label={`${vehicle.name}: ${chapter.title}`}
    >
      <div className={`vehicle-showcase__mosaic vehicle-showcase__mosaic--${chapter.photos.length}`}>
        {chapter.photos.map((photo, photoIndex) => (
          <PhotoTile
            key={photo.key}
            vehicleName={vehicle.name}
            photo={photo}
            priority={priority && photoIndex === 0}
            defer={deferImages && !priority}
          />
        ))}
      </div>

      <div className="vehicle-showcase__copy">
        <p className="vehicle-showcase__eyebrow" data-scene-copy>
          {vehicle.category} <span>·</span> {chapter.label}
        </p>
        <h3 data-scene-copy>{vehicle.name}</h3>
        <p className="vehicle-showcase__chapter-title" data-scene-copy>{chapter.title}</p>
        <p className="vehicle-showcase__description" data-scene-copy>{chapter.description}</p>
        <p className="vehicle-showcase__capacity" data-scene-copy>
          <span>Passenger capacity</span>
          <strong>{vehicle.seatingCapacity} passengers</strong>
        </p>
        <a className="vehicle-showcase__contact" href="#contact" data-scene-copy>
          Plan a journey <ArrowDownRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

interface MobileVehicleProps {
  vehicle: VehicleShowcaseItem;
  vehicleIndex: number;
}

function MobileVehicle({ vehicle, vehicleIndex }: MobileVehicleProps) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const chapter = vehicle.chapters[chapterIndex];

  return (
    <article className="vehicle-showcase__mobile-vehicle">
      <header className="vehicle-showcase__mobile-heading">
        <p>{vehicle.category} <span>·</span> {String(vehicleIndex + 1).padStart(2, '0')}</p>
        <h3>{vehicle.name}</h3>
        <span>{vehicle.seatingCapacity} passengers</span>
      </header>
      <nav className="vehicle-showcase__mobile-nav" aria-label={`${vehicle.name} chapters`}>
        {vehicle.chapters.map((item, index) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={chapterIndex === index}
            onClick={() => setChapterIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <VehicleScene
        vehicle={vehicle}
        chapter={chapter}
        sceneIndex={vehicleIndex * vehicle.chapters.length + chapterIndex}
        priority={vehicleIndex === 0 && chapterIndex === 0}
      />
    </article>
  );
}

interface VehicleShowcaseProps {
  vehicles?: VehicleShowcaseItem[];
}

export function VehicleShowcase({ vehicles = vehicleShowcaseData }: VehicleShowcaseProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const currentChapterRef = useRef<HTMLSpanElement | null>(null);
  const currentVehicleRef = useRef<HTMLSpanElement | null>(null);
  const chapterButtonsRef = useRef<HTMLButtonElement[]>([]);
  const activeVehicleIndexRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
        const scenes = gsap.utils.toArray<HTMLElement>('[data-scene-index]', stage);
        if (scenes.length < 2) return;

        const chapterCount = vehicles[0]?.chapters.length ?? 1;
        const progress = progressRef.current;

        gsap.set(scenes, { autoAlpha: 0, clipPath: 'inset(0 0 0 5%)' });
        gsap.set(scenes[0], { autoAlpha: 1, clipPath: 'inset(0 0 0 0)' });
        gsap.set(scenes[0].querySelectorAll<HTMLElement>('[data-scene-copy]'), { autoAlpha: 1, y: 0 });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'vehicle-showcase',
            trigger: stage,
            start: 'top top',
            end: () => `+=${scenes.length * Math.max(window.innerHeight * 0.34, 260)}`,
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const index = Math.min(Math.floor(self.progress * scenes.length), scenes.length - 1);
              const vehicleIndex = Math.floor(index / chapterCount);
              const chapterIndex = index % chapterCount;
              activeVehicleIndexRef.current = vehicleIndex;
              scenes[index].querySelectorAll<HTMLImageElement>('img[data-deferred-src]').forEach((image) => {
                const source = image.dataset.deferredSrc;
                if (source) {
                  image.src = source;
                  delete image.dataset.deferredSrc;
                }
              });

              if (currentChapterRef.current) {
                currentChapterRef.current.textContent = vehicles[vehicleIndex]?.chapters[chapterIndex]?.label ?? '';
              }
              if (currentVehicleRef.current) {
                currentVehicleRef.current.textContent = `${String(vehicleIndex + 1).padStart(2, '0')} / ${String(vehicles.length).padStart(2, '0')}`;
              }
              chapterButtonsRef.current.forEach((button, buttonIndex) => {
                if (buttonIndex === chapterIndex) button.setAttribute('aria-current', 'step');
                else button.removeAttribute('aria-current');
              });
            },
          },
        });

        scenes.forEach((scene, index) => {
          const sceneImages = scene.querySelectorAll('img');
          const copy = scene.querySelectorAll<HTMLElement>('[data-scene-copy]');

          if (index > 0) {
            timeline.to(scenes[index - 1], { autoAlpha: 0, duration: 0.28 }, index);
            timeline.fromTo(
              scene,
              { autoAlpha: 0, clipPath: 'inset(0 0 0 5%)' },
              { autoAlpha: 1, clipPath: 'inset(0 0 0 0)', duration: 0.42 },
              index,
            );
          }

          if (sceneImages.length) {
            timeline.fromTo(
              sceneImages,
              { scale: 1.055 },
              { scale: 1, duration: 1 },
              index,
            );
          }

          if (index > 0) {
            timeline.fromTo(
              copy,
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.06, ease: 'power2.out' },
              index + 0.08,
            );
          }
        });

        if (progress) timeline.fromTo(progress, { scaleY: 0 }, { scaleY: 1, duration: scenes.length }, 0);
        timelineRef.current = timeline;

        return () => {
          timelineRef.current = null;
        };
      });

      return () => media.revert();
    }, section);

    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    window.addEventListener('load', refresh, { once: true });
    refresh();

    return () => {
      window.removeEventListener('load', refresh);
      timelineRef.current = null;
      context.revert();
    };
  }, [vehicles]);

  const goToChapter = (chapterIndex: number) => {
    const vehicleIndex = activeVehicleIndexRef.current;
    const targetIndex = vehicleIndex * (vehicles[0]?.chapters.length ?? 1) + chapterIndex;

    if (window.matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)').matches) {
      document.querySelector(`[data-mobile-scene="${targetIndex}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const trigger = timelineRef.current?.scrollTrigger;
    if (!trigger) return;
    const targetProgress = (targetIndex + 0.5) / (vehicles.length * (vehicles[0]?.chapters.length ?? 1));
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * targetProgress,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={sectionRef} id="vehicles" className="vehicle-showcase" aria-labelledby="vehicle-showcase-title">
      <div className="vehicle-showcase__intro">
        <p>Our Vehicles</p>
        <h2 id="vehicle-showcase-title">Growing Our Fleet</h2>
        <span>Thoughtful travel, one vehicle at a time.</span>
      </div>

      <div ref={stageRef} className="vehicle-showcase__stage">
        <div className="vehicle-showcase__desktop-scenes" aria-live="off">
          {vehicles.flatMap((vehicle, vehicleIndex) =>
            vehicle.chapters.map((chapter, chapterIndex) => {
              const sceneIndex = vehicleIndex * vehicle.chapters.length + chapterIndex;
              return (
                <VehicleScene
                  key={`${vehicle.id}-${chapter.key}`}
                  vehicle={vehicle}
                  chapter={chapter}
                  sceneIndex={sceneIndex}
                  priority={sceneIndex === 0}
                  deferImages
                />
              );
            }),
          )}
        </div>

        <div className="vehicle-showcase__progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
        <div className="vehicle-showcase__status" aria-live="polite">
          <span ref={currentVehicleRef}>01 / {String(vehicles.length).padStart(2, '0')}</span>
          <span ref={currentChapterRef}>Exterior</span>
        </div>
        <nav className="vehicle-showcase__chapter-nav" aria-label="Vehicle showcase chapters">
          {(vehicles[0]?.chapters ?? []).map((chapter, index) => (
            <button
              key={chapter.key}
              ref={(element) => {
                if (element) chapterButtonsRef.current[index] = element;
              }}
              type="button"
              onClick={() => goToChapter(index)}
              aria-label={`Go to ${chapter.label} chapter for the current vehicle`}
            >
              {chapter.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="vehicle-showcase__mobile">
        {vehicles.map((vehicle, index) => (
          <MobileVehicle key={vehicle.id} vehicle={vehicle} vehicleIndex={index} />
        ))}
      </div>
    </section>
  );
}
